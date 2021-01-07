'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    message: DataTypes.TEXT,
    questionId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Answer.associate = function (models) {
    Answer.belongsTo(models.Question, {
        foreignKey: 'questionId'
      }),
      Answer.belongsTo(models.User, {
        foreignKey: 'userId'
      }),
      Answer.hasMany(models.Comment, {
        foreignKey: 'answerId'
      })
  };
  return Answer;
};
