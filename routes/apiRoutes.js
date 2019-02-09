var db = require("../models");
var router = require('express').Router();

  // Get all examples
  router.get("/", function(req, res, next) {
      /**
       * This is how you access the user on authenticated routes
       */
    console.log("Authenticated User: " + JSON.stringify(req.user));
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  router.post("/", function(req, res, next) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  router.delete("/:id", function(req, res, next) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  module.exports = router;
