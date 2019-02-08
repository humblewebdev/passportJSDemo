'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
        'Examples',
        [
            {
              text: "example1",
              description: "description1",
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
                text: "example2",
                description: "description2",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                text: "example3",
                description: "description3",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                text: "example4",
                description: "description4",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ],
        {}
    );
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete(
        'Examples',
        null,
        {}
    );
  }
};
