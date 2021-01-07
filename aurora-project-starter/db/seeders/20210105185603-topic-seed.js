"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Topics",
      [
        {
          name: "Math & Science",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sports",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "News & Politics",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Business & Finance",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Health & Fitness",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Art & Music",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Books",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Movies",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Entertainment",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Travel",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Automotive",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Food & Drink",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Shopping",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "History",
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
