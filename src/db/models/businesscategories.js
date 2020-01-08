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
