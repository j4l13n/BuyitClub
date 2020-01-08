export default (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    legalName: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Legal name already exists"
      },
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
      unique: {
        args: true,
        msg: "Business with this email already exists"
      },
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
    Business.belongsToMany(models.User, {
      through: models.BusinessUser,
      as: 'users',
      foreignKey: 'businessId'
    });
    Business.hasMany(models.BusinessCategories, {
      foreignKey: 'businessId'
    });
    Business.hasMany(models.PaymentMethod, {
      foreignKey: 'businessId'
    });
  };
  return Business;
};