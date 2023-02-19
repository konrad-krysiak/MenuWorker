"use strict";
import { fileURLToPath } from "url";
import { basename, dirname } from "path";
import { Sequelize, DataTypes } from "sequelize";
import fs from "fs";
import process from "process";

import databaseConfig from "../config/db";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const env = process.env.NODE_ENV || "development";
const db = {};

const config = databaseConfig[env];
const sequelize = new Sequelize(config);

export default await (async () => {
  const files = fs
    .readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf(".") !== 0 &&
        file !== basename(__filename) &&
        file.slice(-3) === ".js"
    );

  for await (const file of files) {
    const model = await import(`./${file}`);
    const namedModel = model.default(sequelize, DataTypes);
    db[namedModel.name] = namedModel;
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
})();
