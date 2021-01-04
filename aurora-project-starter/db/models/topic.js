'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    name: DataTypes.STRING
  }, {});
  Topic.associate = function (models) {

    Topic.hasMany(models.Question, {
      foreignKey: 'topicId'
    })

  };
  return Topic;
};
