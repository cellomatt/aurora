'use strict';
const faker = require('faker')
const bcrypt = require('bcryptjs')



module.exports = {
  up: (queryInterface, Sequelize) => {
    const hashedPassword = (password) => bcrypt.hashSync(password, 10);

    let userArray = [
      {
        username: 'demo_user',
        email: 'demo@email.com',
        hashedPassword: hashedPassword('password'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    for (let i=0; i<50; i++) {
      let password = hashedPassword(faker.internet.password());
      let username;
      const getUsername = () => {
        username = faker.internet.userName()
          if (username.length > 15) {
              username = username.slice(0, 14)
          }
      };
      getUsername();
      const user = {
        username,
        email: faker.internet.email(),
        hashedPassword: password,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      userArray.push(user);
    }

    return queryInterface.bulkInsert('Users', userArray, {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});

  }
};
