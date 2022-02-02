'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    tradedAt: DataTypes.DATE,
    tradeType: DataTypes.STRING,
    currency: DataTypes.STRING,
    tradedFor: DataTypes.STRING,
    amount: DataTypes.NUMBER,
    totalInUsd: DataTypes.INTEGER,
    feesInUsd: DataTypes.INTEGER,
    costBasis: DataTypes.INTEGER,
    acquiredAt: DataTypes.DATE,
    exchange: DataTypes.STRING,
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};
