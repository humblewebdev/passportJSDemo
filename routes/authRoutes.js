var models = require("../models");

var passport = require('passport');
var LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(
    function(username, password, done) {
      models.User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

module.exports = function(app) {
    app.post('/api/auth', function(request, response) {
        passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
    });
};