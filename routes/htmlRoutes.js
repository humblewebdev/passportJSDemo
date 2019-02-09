var db = require("../models");
var jwt = require("jsonwebtoken");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
      if (req.cookies.token) {
          var user = jwt.verify(req.cookies.token, 'your_jwt_secret');
          console.log(user);
          if (user) {
              db.Example.findAll({}).then(function (dbExamples) {
                  return res.render("index", {
                      msg: "Welcome!",
                      loggedInUser: user,
                      examples: dbExamples
                  });
              });
          } else {
              return res.render("index", {
                  msg: "Welcome!"
              });
          }
      } else {
          return res.render("index", {
              msg: "Welcome!"
          });
      }
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
