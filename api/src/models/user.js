'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Post)
  };
  return User;
};
