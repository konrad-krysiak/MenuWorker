import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import middlewares from "./middlewares";
import { StatusCodes } from "http-status-codes";
import initializePassport from "./middlewares/passport.setup";
import passport from "passport";
dotenv.config();

import db from "./models";

const { sequelize } = db;
const app = express();

const registerRoutes = (app) => {
  routes(app);
};

const globalErrorMiddleware = (app) => {
  app.use((err, req, res, next) => {
    console.log("-------------- GLOBAL ERROR OCCURRED ", err);
    res
      .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(err.message);
  });
};
app.use((req, res, next) => {
  req.user = {
    id: 1,
    name: "konrad",
    email: "konrad@onet.pl",
    phone: "123123123",
  };
  next();
});
initializePassport(passport);
middlewares.configure(app);
registerRoutes(app);
globalErrorMiddleware(app);

app.listen(3000, async () => {
  console.log("Server up on port 3000");
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

export default app;
