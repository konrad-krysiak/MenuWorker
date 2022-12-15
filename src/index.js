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
import winstonLogger from './utils/logger';
import restaurantService from './services/restaurantService';
dotenv.config();

const { sequelize } = db;
const app = express();

const registerRoutes = (app) => {
  routes(app);
};

const globalErrorMiddleware = (app) => {
  app.use((err, req, res, next) => {
    winstonLogger.error(JSON.stringify(err));
    res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(err || errorFactory.internalServerError(req.traceId, err));
  });
};

initializePassport(passport);
middlewares.configure(app);
registerRoutes(app);
globalErrorMiddleware(app);


sequelize.sync({ force: true }).then(() => {
  app.listen(3000);
  userService.createUser({
    name: 'konrad', email: 'konrad@onet.pl', phone: '123123123', address: 'Warsaw', password: 'lala',
  });
  // setTimeout(() => {
  //   restaurantService.createRestaurant({ name: 'r1', description: 'lalalalal', phone: '123123123' }, 1);
  // }, 1000);
});
