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

const Model = require("../../models/tag");

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

        partialMatchParams.push("tag");

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

        res.send({
          list: list.map((row) => row),
          count: count,
          pagingRowCount: rowCount,

          references: {},
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

        res.send({
          tag: row,

          references: {},
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
