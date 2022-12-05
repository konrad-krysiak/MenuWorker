import { DataTypes } from 'sequelize';

const Menu = (sequelize) => sequelize.define('menu', {
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  tableName: 'Menus',
});

export default Menu;
