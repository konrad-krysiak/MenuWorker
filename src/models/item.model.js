import { DataTypes } from 'sequelize';

const Item = (sequelize) => sequelize.define('item', {
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
}, {
  tableName: 'Items',
});

export default Item;
