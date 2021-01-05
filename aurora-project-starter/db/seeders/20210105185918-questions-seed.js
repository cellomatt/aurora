"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Questions",
      [
        {
          title: "What is the hottest new techonology",
          message:
            "I am doing a research project for school and looking for the hottest new technology.",
          expertiseId: 1,
          topicId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "What type of bear is best?",
          message: "My coworker thinks black bears are best. Is he correct?",
          expertiseId: 2,
          topicId: 2,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Questions", null, {});
  },
};
