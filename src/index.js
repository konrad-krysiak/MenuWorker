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
// app.use((req, res, next) => {
//   console.log("REQUEST USER: ", req.user);
//   console.log("REQUEST SESSION: ", req.session);
//   next();
// });
registerRoutes(app);
globalErrorMiddleware(app);

app.listen(3000, async () => {
  console.log("Server up on port 3000");
  await sequelize.authenticate();
  try {
    // let a;
    // const user = await userService.createUser({
    //   name: "konrad",
    //   email: "konrad@onet.pl",
    //   phone: "123123123",
    //   password: "lalalala",
    // });
    // // const user2 = await userService.createUser({
    // //   name: "asd",
    // //   email: "konrad@onet2.pl",
    // //   phone: "123123123",
    // //   password: "lalalala",
    // // });
    // const restaurant = await restaurantService.createRestaurant(
    //   {
    //     name: "Restaurant 1",
    //     address: "restaurant address",
    //     description: "restaurant desc",
    //     phone: "444444444",
    //   },
    //   1
    // );
    // const restaurant2 = await restaurantService.createRestaurant(
    //   {
    //     name: "asasdas",
    //     address: "restaurant address",
    //     description: "restaurant desc",
    //     phone: "444444444",
    //   },
    //   1
    // );
  } catch (e) {
    if (e.name === "SequelizeValidationError") {
      console.log("1 ----- ValidationError", e.errors);
    } else if (e.name === "SequelizeUniqueConstraintError") {
      console.log("2 --- UniqueConstraintError", e.errors);
    } else {
      console.log("3 --- SOMETHING ELSE");
    }
    console.log("wowlolololo", e.message);
  }
  console.log("Database connected");
});

// WYGLADA NA TO ZE PUT EDIT ZE ZLYMI DANYMI WYPIERDALA error RESTAURANTS NOT FOUND
// CHECK IT
