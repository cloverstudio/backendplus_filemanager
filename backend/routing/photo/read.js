const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectID;
const formidable = require("formidable");
const formidableMiddleware = require("express-formidable");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const shajs = require("sha.js");

const config = require("../../config");
const constants = require("../../lib/const");
const utils = require("../../lib/utils");
const auth = require("../../lib/auth");

const Model = require("../../models/photo");

const TagModel = require("../../models/tag");

class RouteConstructor {
  constructor(options) {
    this.logger = options.logger;
    this.constructRouter(options.router);
  }

  constructRouter(router) {
    router.get("/", auth(), async (req, res) => {
      try {
        const connection = await Model.getConnection();

        const query = req.query;
        const page = query.page && query.page > 0 ? query.page : 1;
        const sort = query.sort ? query.sort : null;
        const order = query.order ? query.order : null;
        let filters = query.filters ? query.filters : null;

        try {
          filters = JSON.parse(filters);
        } catch (e) {
          console.log(e);
        }

        let list = null;

        const conditions = {};
        const JSONParams = [];
        const partialMatchParams = [];

        if (filters) {
          Object.keys(filters).map((key) => {
            const filter = filters[key];

            if (filter && Array.isArray(filter) && filter.length > 0) {
              if (JSONParams.indexOf(key) != -1) {
                conditions[key] = " ( ";

                filter.map((val) => {
                  conditions[key] += ` JSON_CONTAINS(${key},'"${val}"') or `;
                });

                conditions[key] = conditions[key].substring(
                  0,
                  conditions[key].length - 3
                );
                conditions[key] += " ) ";
              } else {
                conditions[key] = filter;
              }
            } else if (partialMatchParams.indexOf(key) != -1) {
              conditions[key] = {
                key: ` \`${key}\` like ?`,
                value: `%${filter}%`,
              };
            } else conditions[key] = filter;
          });
        }

        if (page == "all") {
          list = await Model.findAll(connection, conditions, null, null);
        } else {
          const skip = constants.PagingRowCount * (page - 1);
          const limit = constants.PagingRowCount;

          list = await Model.findAll(connection, conditions, limit, skip, {
            sort,
            order,
          });
        }

        const count = await Model.findCount(connection, conditions);

        let rowCount = constants.PagingRowCount;

        if (page == "all") {
          rowCount = count;
        }

        // process refered models

        // tag
        const tag_keys = list.reduce((sum, cur) => {
          if (Array.isArray(cur.tag)) {
            // multiple
            cur.tag.map((item) => sum.push(item));
          } else {
            // single
            sum.push(cur.tag);
          }

          return sum;
        }, []);

        let tag_rows = [];

        if (tag_keys && tag_keys.length > 0)
          tag_rows = await TagModel.findAll(connection, {
            id: tag_keys,
          });

        res.send({
          list: list.map((row) => row),
          count: count,
          pagingRowCount: rowCount,

          references: {
            tag: tag_rows,
          },
        });
      } catch (e) {
        console.log(e);
        this.logger.error(e.message);

        return res.status(constants.HttpStatusCodeServerError).send(e.message);
      }
    });

    router.get("/:uniqueId", auth(), async (req, res) => {
      try {
        const connection = await Model.getConnection();

        const row = await Model.findOne(connection, {
          id: req.params.uniqueId,
        });

        if (!row) {
          return res
            .status(constants.HttpStatusCodeInvalidParam)
            .send("Wrong id");
        }

        // process refered models

        // tag
        const tag_keys = row.tag;

        let tag_rows = [];
        if (tag_keys)
          tag_rows = await TagModel.findAll(connection, {
            id: tag_keys,
          });

        res.send({
          photo: row,

          references: {
            tag: tag_rows,
          },
        });
      } catch (e) {
        console.log(e);
        this.logger.error(e.message);

        return res.status(constants.HttpStatusCodeServerError).send(e.message);
      }
    });

    router.get("/file/:uniqueId/:fileId", async (req, res) => {
      try {
        const connection = await Model.getConnection();

        const row = await Model.findOne(connection, {
          id: req.params.uniqueId,
        });

        if (!row) {
          return res
            .status(constants.HttpStatusCodeInvalidParam)
            .send("Wrong id");
        }

        const fileId = req.params.fileId;

        if (!fileId) {
          return res
            .status(constants.HttpStatusCodeInvalidParam)
            .send("Wrong fileId");
        }

        // find a file
        const filePath =
          path.join(__dirname, "../../../", config.uploadsDir) + "/" + fileId;

        if (!fs.existsSync(filePath)) {
          return res
            .status(constants.HttpStatusCodeFileNotExists)
            .send("File  not found");
        }

        let file = null;

        // find a filename
        Object.keys(row).map((key) => {
          const value = row[key];

          if (Array.isArray(value)) {
            const fileObj = value.find((item) => {
              if (item.localFilename == fileId) return true;
              else return false;
            });

            if (fileObj) {
              file = fileObj;
            }
          }
        });

        let findThumbnail = null;

        Object.keys(row).map((key) => {
          const value = row[key];

          if (Array.isArray(value)) {
            const fileObj = value.find((item) => {
              if (item.localFilename == fileId) return true;

              if (item.thumbs) {
                for (let i = 0; i < Object.keys(item.thumbs).length; i++) {
                  const key = Object.keys(item.thumbs)[i];
                  const thumbLocalFileName = item.thumbs[key];
                  if (thumbLocalFileName == fileId) {
                    findThumbnail = {
                      size: key,
                      localName: thumbLocalFileName,
                    };
                    return true;
                  }
                }
              } else return false;
            });

            if (fileObj) {
              file = fileObj;
            }
          }
        });

        if (findThumbnail) {
          res.setHeader("Content-type", "image/jpeg");
          return res.download(
            filePath,
            file.name + "_" + findThumbnail.size + ".jpg"
          );
        } else if (file) res.download(filePath, file.name);
        else
          return res
            .status(constants.HttpStatusCodeFileNotExists)
            .send("File  not found");
      } catch (e) {
        console.log(e);
        this.logger.error(e.message);

        return res.status(constants.HttpStatusCodeServerError).send(e.message);
      }
    });
  }
}

module.exports = (param) => {
  new RouteConstructor({
    router: router,
    ...param,
  });

  return router;
};
