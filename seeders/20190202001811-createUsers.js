'use strict';
var models = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      var fields = {
        username: 'JDoe',
        password: 'password',
        email: 'test@example.com',
        firstname: 'John',
        lastname: 'Doe',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      return models.User.create(fields).then(() => {
        console.log('user created');
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete(
     'user',
     null,
     {}
   );
  }
};
