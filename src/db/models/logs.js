export default (sequelize, DataTypes) => {
  const Logs = sequelize.define('Logs', {
    actionMade: {
      type: DataTypes.STRING,
    },
    ipAddress: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER
    }
  }, {});
  Logs.associate = function(models) {
    // associations can be defined here
  };
  return Logs;
};