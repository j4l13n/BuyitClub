export default (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    legalName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Legal name is required"
      }
    },
    tradingName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Trading name is required"
      }
    },
    businessMobileNumber: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Business mobile number is required"
      }
    },
    businessEmail: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Business Email is required"
      },
      unique: {
        args: true,
        msg: "Business email already exists"
      }
    },
    businessPlan: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING
    }
}, {

});
  Business.associate = function(models) {
    // associations can be defined here
    Business.hasMany(models.BusinessCategories, {
      foreignKey: 'businessId'
    });
    Business.hasMany(models.PaymentMethod, {
      foreignKey: 'businessId'
    });
    Business.belongsToMany(models.User, {
      through: 'UserBusiness',
      as: 'users',
      foreignKey: 'businessId',
      onDelete: 'CASCADE'
    });
    Business.belongsToMany(models.Category, {
      through: 'BusinessCategories',
      as: 'categories',
      foreignKey: 'businessId'
    });
  };
  return Business;
};