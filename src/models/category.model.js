import { DataTypes } from 'sequelize';

const Category = (sequelize) => sequelize.define('category', {
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  tableName: 'Categories',
});

export default Category;
