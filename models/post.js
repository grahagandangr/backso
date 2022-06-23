'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
    }

    static listWithSeacrh(model, search) {

    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      validate: { 
        notEmpty: {
          msg: 'title harus diisi!'
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      validate: { 
        notEmpty: {
          msg: 'imgUrl harus diisi!'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: { 
        notEmpty: {
          msg: 'description harus diisi!'
        }
      }
    },
    repository: {
      type: DataTypes.STRING,
      validate: { 
        notEmpty: {
          msg: 'URL repository harus diisi!'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};