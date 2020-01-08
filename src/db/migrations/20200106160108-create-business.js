'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Businesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      legalName: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      tradingName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      businessMobileNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      businessEmail: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      businessPlan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      country: {
        allowNull: true,
        type: Sequelize.STRING
      },
      city: {
        allowNull: true,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Businesses');
  }
};