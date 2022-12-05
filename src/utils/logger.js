import winston from 'winston';

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
      winston.format.json(),
      winston.format.prettyPrint(),
  ),
  transports: [
    new winston.transports.File({
      level: 'debug',
      filename: './applog.log',
      handleExceptions: true,
      json: false,
      maxsize: 5242880, // 5MB
      colorize: false,
    }),
  ],
});

// if (process.env.NODE_ENV !== 'production') {
winstonLogger.add(new winston.transports.Console({
  format: winston.format.combine(winston.format.simple(), winston.format.colorize({ all: true })),
}));
// }

export default winstonLogger;
