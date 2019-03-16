const winston = require("winston");
const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" })
  ]
});

module.exports = function(err, req, res, next) {
  //Logging the error
  logger.error(err.message, err);
  //error, warn, info, verbose, debug, silly

  res.status(500).send("Something Failed.");
};
