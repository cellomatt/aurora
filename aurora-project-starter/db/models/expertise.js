'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expertise = sequelize.define('Expertise', {
    level: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {});
  Expertise.associate = function(models) {
    // associations can be defined here
  };
  return Expertise;
};