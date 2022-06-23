'use strict';
const {
  Model
} = require('sequelize');
const bcryptjs = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post)
      User.hasOne(models.Profile)
    }

    formatUsername() {
      return this.username.toLowerCase()
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: { 
        notEmpty: {
          msg: 'Username harus diisi!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: { 
        notEmpty: {
          msg: 'Email harus diisi!'
        },
        isEmail: {
          msg: 'Format email tidak valid!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: { 
        notEmpty: {
          msg: 'Username harus diisi!'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, options) => {
    const salt = bcryptjs.genSaltSync(10)
    const hash = bcryptjs.hashSync(instance.password, salt)
    instance.password = hash
    instance.role = 'user'
    instance.username = instance.formatUsername()
  })
  return User;
};