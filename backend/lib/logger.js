module.exports = function() {
  
  "use strict";
  let module = {};

  let moment = require('moment');
  let path = require('path');
  let winston = require('winston');
  let DailyRotateFile = require('winston-daily-rotate-file');
  
  var logLevels = {
    levels: {
      error:  0,
      warn:   1,
      stats:  2,
      info:   3,
      debug:  4,
      trace:  5,
      fine:   6,
      finer:  7
    },
    labelsByName: {}, // to be filled in below
    labelsByValue: {} // to be filled in below
  };

  module.startLogger = function(config) {
    try {

      let logTransports = [];

      if (config.file) {

        const filenameChunks = config.file.split(".");
        let filename = filenameChunks[0] + "_%DATE%";
        if(filenameChunks.length > 1)
            filename += "." + filenameChunks[1];

        const filepath = config.filepath || `./`
        filename = `${filepath}/${filename}`;

        const settings = {
          datePattern: 'YYYY-MM-DD_HH',
          zippedArchive: true,
          prepend: true,
          filename: filename,
          level: config.level,
          maxFiles: config.maxFiles + "d",
          timestamp: function() {
            return moment().tz('GMT').format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
          }
        };

        logTransports.push(new DailyRotateFile(settings));

      }

      if (config.console) {
        logTransports.push(new (winston.transports.Console)());
      }

      const logger = winston.createLogger({
        level: config.level,
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
          }),
          winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        ),
        transports: logTransports
        
      });

      return logger;
    } catch (e) {
      console.error('Could not start logger.');
      console.error(e);
      return false;
    }
  };

  return module;
};