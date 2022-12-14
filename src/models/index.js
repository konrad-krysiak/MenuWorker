import User from './user.model';
import Restaurant from './restaurant.model';
import Menu from './menu.model';
import Category from './category.model';
import Item from './item.model';

const applyModelsAndAssociacions = (db) => {
  const { sequelize } = db;
  db.User = User(sequelize);
  db.Restaurant = Restaurant(sequelize);
  db.Menu = Menu(sequelize);
  db.Category = Category(sequelize);
  db.Item = Item(sequelize);

  // USER - RESTAURANT
  db.User.hasMany(db.Restaurant, {
    foreignKey: {
      allowNull: false,
    },
  });
  db.Restaurant.belongsTo(db.User);

  // RESTAURANT - MENU
  db.Restaurant.hasMany(db.Menu);
  db.Menu.belongsTo(db.Restaurant);

  // MENU - CATEGORY
  db.Menu.hasMany(db.Category);
  db.Category.belongsTo(db.Menu);

  // MENU - ITEM
  db.Menu.hasMany(db.Item);
  db.Item.belongsTo(db.Menu);

  // CATEGORY - ITEM
  db.Category.hasMany(db.Item);
  db.Item.belongsTo(db.Category);
};

export { applyModelsAndAssociacions };
