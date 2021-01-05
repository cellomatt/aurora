'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('Answers', [{
        message: "The hottest new tech is blockchain",
        questionId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: "The best bear is the black bear. Bears eat beets",
        questionId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()

      }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkDelete('Answers', null, {});
    
  }
};
