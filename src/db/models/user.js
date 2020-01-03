import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: {
        args: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please enter your email"
      }
    },
    mobile_number: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please enter your mobile number"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: true,
      }
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: {
        args: false
      },
      defaultValue: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: {
        args: false
      },
      defaultValue: false
    },
    notifications: {
      type: DataTypes.BOOLEAN,
      allowNull: {
        args: false
      },
      defaultValue: false
    },
    image: {
      type: DataTypes.BLOB,
      defaultValue: null
    },  
  }, {
    hooks: {
      beforeCreate: async user => {
        user.password = await bcrypt.hashSync(user.password, 8);
      },
    },
    instanceMethods: {
      validatePassword: async function (password) {
        return await bcrypt.compareSync(password, this.password);
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};