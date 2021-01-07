'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Comments', [
        {
          message: 'Blockchain is beast',
          answerId: 1,
          userId: 12,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          message: 'Wow, what a great solution! Thanks for this.',
          answerId: 2,
          userId: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          message: 'That is debatable',
          answerId: 3,
          userId: 39,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          message: 'I love my Mazda RX-8!',
          answerId: 4,
          userId: 29,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          message: 'Wow that\'s some super smart-sounding science stuff!',
          answerId: 5,
          userId: 9,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          message: 'How do you pronounce Pinot? I\'m hosting my first wine party tonight :)',
          answerId: 6,
          userId: 17,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          message: 'No, it\'s definitely going to be the Steelers.',
          answerId: 7,
          userId: 24,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          message: 'Wow, thanks for the link! This is super helpful. I love the Aurora community!',
          answerId: 8,
          userId: 20,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          message: 'What is ROI? I\'m going to start a new business and this seems really important.',
          answerId: 9,
          userId: 36,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          message: 'Planks are so hard!!!',
          answerId: 10,
          userId: 48,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          message: 'This is one of my all-time favorites. Good choice!',
          answerId: 11,
          userId: 16,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          message: 'One example would be Austin Powers and Dr. Evil.',
          answerId: 12,
          userId: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          message: 'Elizabeth Moss was amazing in that movie.',
          answerId: 13,
          userId: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          message: 'Says you! I disagree, they would be so cute.',
          answerId: 14,
          userId: 27,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          message: 'I got my tree at Target this year... they have great deals!',
          answerId: 15,
          userId: 44,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          message: 'Wow honestly same, Napoleon, same.',
          answerId: 16,
          userId: 38,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          message: 'Whoa that\'s huge, I had no idea they were that heavy.',
          answerId: 17,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Comments', null, {});

  }
};
