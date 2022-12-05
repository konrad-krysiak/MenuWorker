import { Sequelize, Op } from 'sequelize';
import dbConfig from '../config/db.config';
import User from '../models/user.model';

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
  // load model to sequelize
  db.User = User(sequelize);
  db.operator = Op;
}

export default db;
