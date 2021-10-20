'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyCart extends Model {
    static associate(models) {
      MyCart.belongsTo(models.User, { foreignKey: `UserId` })
      MyCart.belongsTo(models.Product, { foreignKey: `ProductId` })
    }
  };
  MyCart.init({
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    ProductId:  {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
  }, {
    sequelize,
    modelName: 'MyCart',
  });
  return MyCart;
};