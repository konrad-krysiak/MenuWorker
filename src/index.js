import "./bootstrap";
import express from "express";
import passport from "passport";

import db from "./models";
import registerRoutes from "./routes";
import {
  globalErrorMiddleware,
  configureServer,
  initializePassport,
} from "./middlewares";

const { sequelize, Menu, Restaurant, Category, Product, User } = db;
const app = express();

// Keep user logged in in development
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    req.user = {
      id: 1,
      name: "konrad",
      email: "konrad@onet.pl",
      phone: "123123123",
    };
  }
  next();
});

// Configuration
initializePassport(passport);
configureServer(app);

// Routes
registerRoutes(app);

// Error middlewares
app.use(globalErrorMiddleware);

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
