'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
  }
  Profile.init({
    name: {
      type: DataTypes.STRING,
      validate: { 
        notEmpty: {
          msg: 'Name harus diisi!'
        }
      }
    },
    bio: {
      type: DataTypes.STRING,
      validate: { 
        notEmpty: {
          msg: 'Bio harus diisi!'
        }
      }
    },
    profilePicture: {
      type: DataTypes.STRING,
      validate: { 
        notEmpty: {
          msg: 'URL Profile Picture harus diisi!'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};