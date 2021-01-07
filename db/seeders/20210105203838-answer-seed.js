'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Answers', [{
        message: "The hottest new tech is blockchain",
        questionId: 1,
        userId: 22,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: "Chernobyl could be fascinating, I've heard the tour is pretty entertaining.",
        questionId: 2,
        userId: 50,
        createdAt: new Date(),
        updatedAt: new Date()

      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Answers', null, {});

  }
};
