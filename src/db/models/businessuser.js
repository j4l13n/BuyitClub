export default (sequelize, DataTypes) => {
  const BusinessUser = sequelize.define('BusinessUser', {
    userId: DataTypes.INTEGER,
    businessId: DataTypes.INTEGER
  }, {});
  BusinessUser.associate = function(models) {
    // associations can be defined here
  };
  return BusinessUser;
};