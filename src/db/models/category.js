'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Category name is required"
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: {
        args: true
      }
    }
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.belongsToMay(models.Business, {
      through: 'BusinessCategories',
      as: 'businesses',
      foreignKey: 'categoryId'
    });
  };
  return Category;
};