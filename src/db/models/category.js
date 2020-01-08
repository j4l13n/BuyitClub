export default (sequelize, DataTypes) => {
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
        args: false,
        msg: "Category image is required"
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: {
        args: true
      }
    },
    parent: {
      type: DataTypes.STRING,
      allowNull: {
        args: true
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: {
        args: true,
      }
    }
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.BusinessCategories, {
      foreignKey: 'categoryId'
    });
  };
  return Category;
};