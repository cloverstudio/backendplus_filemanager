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
    router.delete("/:uniqueId", auth(), async (req, res) => {
      try {
        const connection = await Model.getConnection();

        // check ID valid
        const uniqueId = req.params.uniqueId;

        if (!uniqueId || uniqueId.length === 0)
          return res
            .status(constants.HttpStatusCodeInvalidParam)
            .send("Wrong parameter");

        const row = await Model.findOne(connection, {
          id: uniqueId,
        });

        if (!row) {
          return res
            .status(constants.HttpStatusCodeInvalidParam)
            .send("Wrong unique id");
        }

        // delete files
        Object.keys(row).map((key) => {
          const value = row[key];

          if (Array.isArray(value) && value[0] && value[0].name) {
            value.map((file) => {
              const filePath =
                path.join(__dirname, "../../", config.uploadsDir) +
                "/" +
                file.localFilename;

              if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            });
          }
        });

        const deleteResult = await Model.deleteOne(connection, {
          id: uniqueId,
        });

        if (!deleteResult || deleteResult !== 1) {
          return res
            .status(constants.HttpStatusCodeServerError)
            .send("Failed to delete.");
        }

        res.send({
          deleted: true,
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
