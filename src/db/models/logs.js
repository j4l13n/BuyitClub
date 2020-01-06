'use strict';
module.exports = (sequelize, DataTypes) => {
  const Logs = sequelize.define('Logs', {
    actionMade: DataTypes.STRING,
    ipAddress: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Logs.associate = function(models) {
    // associations can be defined here
  };
  return Logs;
};