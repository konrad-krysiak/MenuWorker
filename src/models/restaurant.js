"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
      });

      this.hasMany(models.Menu, {
        foreignKey: {
          name: "restaurantId",
          allowNull: false,
        },
      });
    }
  }
  Restaurant.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 20],
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 20],
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 50],
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^(([+]{0,1}\d{2})|\d?)[\s-]?[0-9]{2}[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/gm,
            msg: "phone must be valid phone number.",
          },
        },
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Restaurant",
    }
  );
  return Restaurant;
};
