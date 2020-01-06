export default (sequelize, DataTypes) => {
  const UserBusiness = sequelize.define('UserBusiness', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId',
      }
    },
    businessId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Business',
        key: 'id',
        as: 'businessId',
      }
    }
  }, {});
  UserBusiness.associate = function(models) {
    // associations can be defined here
  };
  return UserBusiness;
};