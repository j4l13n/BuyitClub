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
      },
      unique: {
        args: true,
        msg: "Email already exists"
      },
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please enter your mobile number"
      },
      unique: {
        args: true,
        msg: "Mobile number already exists"
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: true,
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: {
        args: false
      },
      defaultValue: false
    },
    isActive: {
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
    businessId: {
      type: DataTypes.INTEGER
    } 
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
    User.belongsToMany(models.Business, {
      through: 'UserBusiness',
      as: 'businesses',
      foreignKey: 'userId'
    })
  };
  return User;
};