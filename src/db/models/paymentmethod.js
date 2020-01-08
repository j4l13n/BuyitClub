export default (sequelize, DataTypes) => {
  const PaymentMethod = sequelize.define('PaymentMethod', {
    name: {
      type: DataTypes.STRING,
    },
    businessId: {
      type: DataTypes.INTEGER,
    }
  }, {});
  PaymentMethod.associate = function(models) {
    // associations can be defined here
    PaymentMethod.belongsTo(models.Business, {
      foreignKey: "businessId",
      onDelete: 'CASCADE'
    })
  };
  return PaymentMethod;
};