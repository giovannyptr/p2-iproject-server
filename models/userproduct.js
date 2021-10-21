'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProduct.belongsTo(models.Product, { foreignKey: "ProductId" });
      UserProduct.belongsTo(models.User, { foreignKey: "UserId" });
    }
  };
  UserProduct.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    order_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserProduct',
  });
  return UserProduct;
};