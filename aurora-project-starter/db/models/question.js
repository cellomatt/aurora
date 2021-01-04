'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: DataTypes.STRING,
    message: DataTypes.STRING,
    expertiseId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Question.associate = function (models) {
    Question.belongsTo(models.Expertise, {
        foreignKey: 'expertiseId'
      }),
      Question.belongsTo(models.Topic, {
        foreignKey: 'topicId'
      }),
      Question.belongsTo(models.User, {
        foreignKey: 'userId'
      }),
      Question.hasMany(models.Answer, {
        foreignKey: 'questionId'
      })

  };
  return Question;
};
