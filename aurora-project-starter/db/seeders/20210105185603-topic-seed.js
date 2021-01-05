"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Topics",
      [
        {
          name: "Technology",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sports",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Politics",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Topics", null, {});
  },
};
