"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, {
        foreignKey: {
          name: "categoryId",
          allowNull: false,
        },
      });
    }
  }
  Product.init(
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
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
      hooks: {
        afterCreate: async (product) => {
          const parentMenu = await sequelize.models.Menu.findOne({
            include: {
              model: sequelize.models.Category,
              required: true,
              where: { id: product.categoryId },
            },
          });
          if (parentMenu) {
            await parentMenu.increment("itemCount");
          }
        },
        afterDestroy: async (product) => {
          const parentMenu = await sequelize.models.Menu.findOne({
            include: {
              model: sequelize.models.Category,
              required: true,
              where: { id: product.categoryId },
            },
          });
          if (parentMenu) {
            await parentMenu.decrement("itemCount");
          }
        },
      },
    }
  );
  return Product;
};
