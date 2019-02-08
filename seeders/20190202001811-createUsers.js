'use strict';
var models = require('../models');

module.exports = {
  up: function()  {
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
      return models.User.create(fields).then(function() {
        console.log('user created');
      });
  },

  down: function(queryInterface) {
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
