'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [
        {
          username: 'John_Doe',
          email: 'jd@gmail.com',
          hashedPassword: 'hpassword',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'demo_user',
          email: 'demo@email.com',
          hashedPassword: 'password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'aurorapro97',
          email: 'test@gmail.com',
          hashedPassword: 'password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'smallgiraffe',
          email: 'giraffe@email.com',
          hashedPassword: 'password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'fuzzybunny',
          email: 'bunny@email.com',
          hashedPassword: 'password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'ilovedogs49',
          email: 'woof@email.com',
          hashedPassword: 'password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});

  }
};
