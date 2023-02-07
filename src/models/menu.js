"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Restaurant, {
        foreignKey: {
          name: "restaurantId",
          allowNull: false,
        },
      });

      this.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
      });

      this.hasMany(models.Category, {
        foreignKey: {
          name: "menuId",
          allowNull: false,
        },
      });
    }
  }
  Menu.init(
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
      itemCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Menu",
    }
  );
  return Menu;
};
