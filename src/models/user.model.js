import { DataTypes } from 'sequelize';

const User = (sequelize) => sequelize.define('user', {
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      // We require usernames to have length of at least 3, and
      // only use letters, numbers and underscores.
      is: /^\w{3,}$/,
    },
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    validate: {
      is: /^\S+@\S+\.\S+$/,
    },
  },
  phone: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      is: /^(([+]{0,1}\d{2})|\d?)[\s-]?[0-9]{2}[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/gm,
    },
  },
  address: {
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  tableName: 'Users',
});

export default User;
