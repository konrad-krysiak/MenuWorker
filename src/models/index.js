import User from './user.model';
import Restaurant from './restaurant.model';

const applyModelsAndAssociacions = (db) => {
  const { sequelize } = db;
  db.User = User(sequelize);
  db.Restaurant = Restaurant(sequelize);

  db.User.hasOne(db.Restaurant);
  db.Restaurant.belongsTo(db.User);
};

export { applyModelsAndAssociacions };
