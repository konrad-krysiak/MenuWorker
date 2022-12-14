import { DataTypes } from 'sequelize';

const Restaurant = (sequelize) => sequelize.define('restaurant', {
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
    validate: {
      is: /^(([+]{0,1}\d{2})|\d?)[\s-]?[0-9]{2}[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/gm,
    },
  },
}, {
  tableName: 'Restaurants',
});

export default Restaurant;
