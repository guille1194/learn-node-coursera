var express = require('express')
var bodyParser = require('body-parser')
var Verify = require('./verify')

var Leadership = require('../models/leadership')

var leaderRouter = express.Router()
leaderRouter.use(bodyParser.json())
leaderRouter.route('/')
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Leadership.find({}, function (err, leaderships) {
      if (err) throw err
      res.json(leaderships)
    })
  })
  .post(Verify.verifyAdmin, function (req, res, next) {
    Leadership.create(req.body, function (err, leadership) {
      if (err) throw err
      var id = leadership._id
      res.writeHead(200, {'Content-type': 'text/plain'})
      res.end('Added leadership with id: ' + id)
    })
  })
  .delete(Verify.verifyAdmin, function (req, res, next) {
    Leadership.remove({}, function (err, resp) {
      if (err) throw err
      res.json(resp)
    })
  })

leaderRouter.route('/:id')
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Leadership.findById(req.params.id, function (err, leadership) {
      if (err) throw err
      res.json(leadership)
    })
  })
  .put(Verify.verifyAdmin, function (req, res, next) {
    Leadership.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function (err, leadership) {
      if (err) throw err
      res.json(leadership)
    })
  })
  .delete(Verify.verifyAdmin, function (req, res, next) {
    Leadership.remove(req.params.id, function (err, resp) {
      if (err) throw err
      res.json(resp)
    })
  })

module.exports = leaderRouter
