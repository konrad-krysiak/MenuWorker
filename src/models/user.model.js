import { DataTypes } from 'sequelize';

const User = (sequelize) => sequelize.define('user', {
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    validate: {
      // We require usernames to have length of at least 3, and
      // only use letters, numbers and underscores.
      is: /^\w{3,}$/,
    },
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      is: /^\S+@\S+\.\S+$/,
    },
  },
  phone: {
    type: DataTypes.STRING,
    validate: {
      is: /^(([+]{0,1}\d{2})|\d?)[\s-]?[0-9]{2}[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/gm,
    },
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  tableName: 'Users',
});

export default User;
