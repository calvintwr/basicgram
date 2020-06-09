'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    caption: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User)
  };
  return Post;
};