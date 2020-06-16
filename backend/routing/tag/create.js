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
    router.post("/", auth(), async (req, res) => {
      try {
        // check param
        const body = req.body;

        const connection = await Model.getConnection();

        let errors = await Model.validate(connection, body);

        if (errors && errors.length > 0) {
          const errorMessage = errors.reduce((message, error) => {
            return (message += error + ",");
          }, "");
          return res
            .status(constants.HttpStatusCodeInvalidParam)
            .send(errorMessage);
        }

        const newId = await Model.insert(connection, {
          user_id: req.user.id,

          tag: body.tag,
        });

        const row = await Model.findOne(connection, { id: newId });

        res.send({
          tag: row,
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
