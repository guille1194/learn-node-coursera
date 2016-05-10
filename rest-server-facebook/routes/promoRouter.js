var express = require('express')
var bodyParser = require('body-parser')
var Verify = require('./verify')

var Promotion = require('../models/promotion')


var promoRouter = express.Router()
promoRouter.use(bodyParser.json())
promoRouter.route('/')
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Promotion.find({}, function (err, promotions) {
      if (err) throw err
      res.json(promotions)
    })
  })
  .post(Verify.verifyAdmin, function (req, res, next) {
    Promotion.create(req.body, function (err, promotion) {
      if (err) throw err
      var id = promotion._id
      res.writeHead(200, {'Content-type': 'text/plain'})
      res.end('Added promotion with id: ' + id)
    })
  })
  .delete(Verify.verifyAdmin, function (req, res, next) {
    Promotion.remove({}, function (err, resp) {
      if (err) throw err
      res.json(resp)
    })
  })

promoRouter.route('/:id')
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Promotion.findById(req.params.id, function (err, promotion) {
      if (err) throw err
      res.json(promotion)
    })
  })
  .put(Verify.verifyAdmin, function (req, res, next) {
    Promotion.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function (err, promotion) {
      if (err) throw err
      res.json(promotion)
    })  })
  .delete(Verify.verifyAdmin, function (req, res, next) {
    Promotion.remove(req.params.id, function (err, resp) {
      if (err) throw err
      res.json(resp)
    })
  })

module.exports = promoRouter
