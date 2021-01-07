'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    message: DataTypes.TEXT,
    answerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Comment.associate = function (models) {
    Comment.belongsTo(models.Answer, {
        foreignKey: 'answerId'
      }),
      Comment.belongsTo(models.User, {
        foreignKey: 'userId'
      })
  };
  return Comment;
};
