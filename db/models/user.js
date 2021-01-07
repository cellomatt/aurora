'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.TEXT
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Question, {
        foreignKey: 'userId'
      }),
      User.hasMany(models.Answer, {
        foreignKey: 'userId'
      }),
      User.hasMany(models.Comment, {
        foreignKey: 'userId'
      })
  };
  return User;
};
