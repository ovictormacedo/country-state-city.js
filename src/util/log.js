const winston = require('winston');

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: process.env.APP_LOG_PATH })
    ]
  });

exports.info = msg => {
    return logger.info(msg);
}

exports.error = msg => {
    return logger.error(msg);
}

exports.warn = msg => {
    return logger.warn(msg);
}
