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
        message: "x = (-b +/- sqrt(b^2 - 4ac)) / 2a",
        questionId: 2,
        userId: 40,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        message: "Chernobyl could be fascinating, I've heard the tour is pretty entertaining.",
        questionId: 3,
        userId: 50,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        message: "Look for something from Mazda.",
        questionId: 4,
        userId: 23,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        message: "The platform of these vaccines (RNA) is, in my opinion, really compelling because there are lower risks for off target effects and it allows the body to recognize the vaccine more similarly to how it would a real infection compared to 'classical' vaccine modalities, which suggests they may be more effective in achieving long-lasting immunity--you would not be able to spread virus to others after you get a protective immune response following vaccination.",
        questionId: 5,
        userId: 12,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        message: "Light red wines like Pinot Noir and Beaujolais match up nicely with delicately flavored, washed-rind cheeses and nutty, medium-firm cheeses. Gruyere is a great example of nutty cheese, and Taleggio is a semi-soft, washed-rind cheese that is not overly intense.",
        questionId: 6,
        userId: 31,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        message: "The Buffalo Bills have the best record in the league, believe it or not! My money's on them.",
        questionId: 7,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        message: "You can find lots of useful information on the CDC's website: https://www.cdc.gov/coronavirus/2019-ncov/travelers/map-and-travel-notices.html",
        questionId: 8,
        userId: 14,
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        message: "ROI is calculated by subtracting the initial value of the investment from the final value of the investment (which equals the net return), then dividing this new number (the net return) by the cost of the investment, and, finally, multiplying it by 100.",
        questionId: 9,
        userId: 21,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        message: "Planks, side-planks and leg raises.",
        questionId: 10,
        userId: 13,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        message: "Hey Jude by The Beatles.",
        questionId: 11,
        userId: 39,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        message: "Protagonists and antagonists are both essential characters in a story, but they propel the plot in different and usually opposite ways: The protagonist works toward the central story goals, while the antagonist works against the goals.",
        questionId: 12,
        userId: 45,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        message: "The Invisible Man with Elizabeth Moss, enough said.",
        questionId: 13,
        userId: 8,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        message: "They are never, ever, ever getting back together.",
        questionId: 14,
        userId: 18,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        message: "You could try Walmart or Target.",
        questionId: 15,
        userId: 11,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        message: "Roast chicken with fried potatos and onions.",
        questionId: 16,
        userId: 29,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        message: "The African bush elephant. It can weigh up to 11.5 short tons, or 23,000 pounds",
        questionId: 17,
        userId: 21,
        createdAt: new Date(),
        updatedAt: new Date()

      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Answers', null, {});

  }
};