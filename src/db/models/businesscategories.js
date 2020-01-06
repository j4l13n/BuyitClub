'use strict';
module.exports = (sequelize, DataTypes) => {
  const BusinessCategories = sequelize.define('BusinessCategories', {
    categoryId: DataTypes.INTEGER,
    businessId: DataTypes.INTEGER
  }, {});
  BusinessCategories.associate = function(models) {
    // associations can be defined here
  };
  return BusinessCategories;
};