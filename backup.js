export default (sequelize, DataTypes) => {
    const BusinessCategories = sequelize.define('BusinessCategories', {
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: "Category id is required for Business category"
        },
        references: {
          model: 'Category',
          key: 'id',
          as: 'categoryId',
        }
      },
      businessId: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: "Business id is required for Business category"
        },
        references: {
          model: 'Business',
          key: 'id',
          as: 'BusinessId',
        }
      }
    }, {});
    BusinessCategories.associate = function(models) {
      // associations can be defined here
      BusinessCategories.belongsTo(models.Business, {
        foreignKey: "businessId",
        onDelete: 'CASCADE'
      });
      BusinessCategories.belongsTo(models.Category, {
        foreignKey: "categoryId",
        onDelete: 'CASCADE'
      });
    };
    return BusinessCategories;
  };


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