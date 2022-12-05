import express from 'express';
import dotenv from 'dotenv';
import db from './helpers/db';
import routes from './routes';
import middlewares from './middlewares';
import { StatusCodes } from 'http-status-codes';
import errorFactory from './utils/errorFactory';
import userService from './services/userService';
import initializePassport from './middlewares/passport.setup';
import passport from 'passport';
import expressWinston from 'express-winston';
import winston from 'winston';
dotenv.config();

const { sequelize } = db;
const app = express();

// app.use(expressWinston.logger({
//   transports: [
//     new winston.transports.Console(),
//   ],
//   format: winston.format.combine(
//       winston.format.json(),
//       winston.format.prettyPrint(),
//   ),
// }));

const registerRoutes = (app) => {
  routes(app);
};

const globalErrorMiddleware = (app) => {
  app.use((err, req, res, next) => {
    winstonLogger.error(err.status || err);
    res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(err || errorFactory.internalServerError(req.traceId, err));
  });
};

initializePassport(passport);
middlewares.configure(app);
registerRoutes(app);
// globalErrorMiddleware(app);


sequelize.sync({ force: true }).then(() => {
  app.listen(3000);
  userService.createUser({
    username: 'konrad', email: 'konrad@onet.pl', phone: '123123123', password: 'lala',
  });
  setTimeout(() => {
    userService.getUserByEmail('konrad@onet.pl');
  }, 1000);
});
