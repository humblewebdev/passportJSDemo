var db = require("../models");
var router = require('express').Router();

  // Get all examples
  router.get("/examples", function(req, res, next) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  router.post("/examples", function(req, res, next) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  router.delete("/examples/:id", function(req, res, next) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  module.exports = router;
