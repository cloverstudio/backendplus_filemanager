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

const Model = require("../../models/file");

const TagModel = require("../../models/tag");

class RouteConstructor {
  constructor(options) {
    this.logger = options.logger;
    this.constructRouter(options.router);
  }

  constructRouter(router) {
    router.put("/", auth(), formidableMiddleware(), async (req, res) => {
      try {
        const body = await utils.parseFileRequest(req);

        if (!body.id)
          return res
            .status(constants.HttpStatusCodeInvalidParam)
            .send("Wrong parameter");

        const connection = await Model.getConnection();

        // handle files
        const previousRow = await Model.findOne(connection, {
          id: body.id,
        });

        if (!previousRow.file) previousRow.file = [];
        if (!body.fileAdd) body.fileAdd = [];

        if (body.fileDelete && body.fileDelete.length > 0) {
          previousRow.file = previousRow.file.filter((file) => {
            return body.fileDelete.indexOf(file.localFilename) === -1;
          });
        }

        body.file = [...previousRow.file, ...body.fileAdd];

        let errors = await Model.validate(connection, body, body.id);

        if (errors && errors.length > 0) {
          const errorMessage = errors.reduce((message, error) => {
            return (message += error + ",");
          }, "");
          return res
            .status(constants.HttpStatusCodeInvalidParam)
            .send(errorMessage);
        }

        const updateParams = {
          file: body.file,

          description: body.description,

          tag: body.tag,

          modified_at: moment().format("YYYY-MM-DD  HH:mm:ss.000"),
        };

        // delete files

        console.log("body.fileDelete", body.fileDelete);

        if (body.fileDelete && body.fileDelete.length > 0) {
          body.fileDelete.map((fileId) => {
            const filePath =
              path.join(__dirname, "../../", config.uploadsDir) + "/" + fileId;

            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
          });
        }

        console.log("body.descriptionDelete", body.descriptionDelete);

        console.log("body.tagDelete", body.tagDelete);

        const updateResult = await Model.updateOne(connection, updateParams, {
          id: body.id,
        });

        const row = await Model.findOne(connection, { id: body.id });

        res.send({
          file: row,
        });
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
