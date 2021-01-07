"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Expertises",
      [
        {
          level: 1,
          description: "Novice",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: 2,
          description: "Intermediate",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: 3,
          description: "Expert",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Expertises", null, {});
  },
};
