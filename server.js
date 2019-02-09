require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var models = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

var passport = require('passport');
var LocalStrategy = require('passport-local');
var JWTStrategy = require('passport-jwt').Strategy;
var ExtractJWT = require('passport-jwt').ExtractJwt;


// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, cb) {
    models.User.findOne({ username: username }).then(
        function(user) {
          if (!user || !user.validatePassword(password)) {
              return cb(null, false, {message: 'Incorrect email or password.'});
          }
            return cb(null, user, {message: 'Logged In Successfully'});
        }
      ).catch(function(error) {
        cb(error)
        throw error;
      });
    }
  ));

  passport.use(
      new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
      }, function(jwtPayload, done) {
          //find the user in db if needed
        try {
            return done(null, jwtPayload)
        } catch (error) {
            console.log(error);

            done(error);
        }
      }
  ));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
var secureRoute = require("./routes/apiRoutes");
require("./routes/authRoutes")(app);
app.use('/api/examples', passport.authenticate('jwt', {session: false}), secureRoute);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
models.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
