'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tradedAt: {
        type: Sequelize.DATE
      },
      tradeType: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      tradedFor: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.NUMBER
      },
      totalInUsd: {
        type: Sequelize.INTEGER
      },
      feesInUsd: {
        type: Sequelize.INTEGER
      },
      costBasis: {
        type: Sequelize.INTEGER
      },
      acquiredAt: {
        type: Sequelize.DATE
      },
      exchange: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};