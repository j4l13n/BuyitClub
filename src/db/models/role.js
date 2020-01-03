export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        unique: true,
        msg: 'Please role name is required'
      }
    }
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
  };
  return Role;
};