import winston from "winston";

// LOGGING LEVELS
// {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6
// }

const logFormat = winston.format.printf(function (info) {
  return `${info.level}: ${JSON.stringify(info.message, null, 4)}\n`;
});

const winstonLogger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "error",
      filename: "./logs/server.log",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      handleExceptions: true,
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  winstonLogger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    })
  );
}

export default winstonLogger;
