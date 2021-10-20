'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Product.belongsToMany(models.User,
        {
          through: models.MyCart, foreignKey: 'ProductId'
        });
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};