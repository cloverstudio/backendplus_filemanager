const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const config = require("./config");
const log = require("./lib/logger.js")();
const DB = require("./lib/database");

class server {
  constructor() {
    // create log dir if not exists
    try {
      console.log("config", config);

      if (!fs.existsSync(config.logging.filepath)) {
        console.log(`log dir created ${config.logging.filepath}`);
        fs.mkdirSync(config.logging.filepath);
      }
    } catch (err) {
      console.error(err);
    }

    // create upload dir if not exists
    try {
      if (!fs.existsSync(config.uploadsDir)) {
        console.log(`upload dir created ${config.uploadsDir}`);
        fs.mkdirSync(config.uploadsDir);
      }
    } catch (err) {
      console.error(err);
    }

    this.logger = log.startLogger({
      filepath: config.logging.filepath,
      file: config.logging.file,
      level: config.logging.level,
      console: config.logging.console,
      maxFiles: config.logging.maxFiles,
    });

    DB.init(config.mysqlConnection);

    this.app = express();
  }

  async setup() {
    try {
      this.logger.info("starting server");

      // check db connection
      await DB.getConnection();

      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }));
      this.app.use(cors());
      this.app.disable("etag");
      this.app.use(express.json({ limit: "500mb" }));
      this.app.use(express.urlencoded({ limit: "500mb" }));

      // static routing
      this.app.use(
        config.baseUrl + "/",
        express.static(path.join(__dirname, "../", "public"))
      );

      // dynamic routing
      this.app.use(
        config.baseUrl + "/api/test_EALSV66GKV",
        require("./routing/test")({
          logger: this.logger,
        })
      );

      this.app.use(
        config.baseUrl + "/api/signin",
        require("./routing/signin")({
          logger: this.logger,
        })
      );

      this.app.use(
        config.baseUrl + "/api/user",
        require("./routing/user")({
          logger: this.logger,
        })
      );

      this.app.use(
        config.baseUrl + "/api/tag",
        require("./routing/tag/create")({
          logger: this.logger,
        })
      );

      this.app.use(
        config.baseUrl + "/api/tag",
        require("./routing/tag/read")({
          logger: this.logger,
        })
      );

      this.app.use(
        config.baseUrl + "/api/tag",
        require("./routing/tag/update")({
          logger: this.logger,
        })
      );

      this.app.use(
        config.baseUrl + "/api/tag",
        require("./routing/tag/delete")({
          logger: this.logger,
        })
      );

      this.app.use(
        config.baseUrl + "/api/file",
        require("./routing/file/create")({
          logger: this.logger,
        })
      );

      this.app.use(
        config.baseUrl + "/api/file",
        require("./routing/file/read")({
          logger: this.logger,
        })
      );

      this.app.use(
        config.baseUrl + "/api/file",
        require("./routing/file/update")({
          logger: this.logger,
        })
      );

      this.app.use(
        config.baseUrl + "/api/file",
        require("./routing/file/delete")({
          logger: this.logger,
        })
      );

      this.app.use(
        config.baseUrl + "/api/photo",
        require("./routing/photo/create")({
          logger: this.logger,
        })
      );

      this.app.use(
        config.baseUrl + "/api/photo",
        require("./routing/photo/read")({
          logger: this.logger,
        })
      );

      this.app.use(
        config.baseUrl + "/api/photo",
        require("./routing/photo/update")({
          logger: this.logger,
        })
      );

      this.app.use(
        config.baseUrl + "/api/photo",
        require("./routing/photo/delete")({
          logger: this.logger,
        })
      );

      this.app.get("*", function (request, response) {
        response
          .status(200)
          .sendFile(path.join(__dirname, "../", "public/index.html"));
      });
    } catch (e) {
      console.error(e);
      this.logger.error(e.message);

      // wait to write log and exit
      setTimeout(() => {
        process.exit(1);
      }, 1000);
    }
  }

  start() {
    this.app.listen(config.serverPort);
    this.logger.info("Server is running on port " + config.serverPort);
  }
}

(async () => {
  const serverInstance = new server();

  await serverInstance.setup();
  serverInstance.start();
})();
