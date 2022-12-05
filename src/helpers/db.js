import { Sequelize, Op } from 'sequelize';
import dbConfig from '../config/db.config';
import { applyModelsAndAssociacions } from '../models';
const db = {};

initialize();

/**
 * Initialize sequelize object along with models
 */
function initialize() {
  const {
    user, password, database,
  } = dbConfig;
  // connect to db
  const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  db.operator = Op;

  applyModelsAndAssociacions(db);
}

export default db;
