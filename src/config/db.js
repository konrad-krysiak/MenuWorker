import "../bootstrap.js";

export default {
  development: {
    username: "menuworker",
    password: "menuworker",
    database: "MenuWorker",
    host: "localhost",
    dialect: "postgres",
    logging: true,
  },
  test: {
    username: "menuworker",
    password: "menuworker",
    database: "MenuWorkerTest",
    host: "localhost",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
};
