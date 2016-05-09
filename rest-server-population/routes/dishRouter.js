var express = require('express')
var bodyParser = require('body-parser')
var Verify = require('./verify')

var Dish = require('../models/dish')

var dishRouter = express.Router()
dishRouter.use(bodyParser.json())

dishRouter.route('/')
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dish.find({})
      .populate('comments.postedBy')
      .exec(function (err, dishes) {
        if (err) throw err
        res.json(dishes)
      })
  })
  .post(Verify.verifyAdmin, function (req, res, next) {
    Dish.create(req.body, function (err, dish) {
      if (err) throw err
      var id = dish._id
      res.writeHead(200, {'Content-type': 'text/plain'})
      res.end('Added dish with id: ' + id)
    })
  })
  .delete(Verify.verifyAdmin, function (req, res, next) {
    Dish.remove({}, function (err, resp) {
      if (err) throw err
      res.json(resp)
    })
  })

dishRouter.route('/:id')
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dish.findById(req.params.id)
      .populate('comments.postedBy')
      .exec(function (err, dish) {
        if (err) throw err
        res.json(dish)
      })
  })
  .put(Verify.verifyAdmin, function (req, res, next) {
    Dish.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function (err, dish) {
      if (err) throw err
      res.json(dish)
    })
  })
  .delete(Verify.verifyAdmin, function (req, res, next) {
    Dish.remove(req.params.id, function (err, resp) {
      if (err) throw err
      res.json(resp)
    })
  })

dishRouter.route('/:id/comments')
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dish.findById(req.params.id)
      .populate('comments.postedBy')
      .exec(function (err, dish) {
        if (err) throw err
        res.json(dish.comments)
      })
  })
  .post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dish.findById(req.params.id)
      .populate('comments.postedBy')
      .exec(function (err, dish) {
        if (err) throw err
        req.body.postedBy = req.decoded._doc._id
        dish.comments.push(req.body)
        dish.save(function (err, dish) {
          if (err) throw err
          res.json(dish)
        })
      })
  })
  .delete(Verify.verifyAdmin, function (req, res, next) {
    Dish.findById(req.params.id, function (err, dish) {
      if (err) throw err
      dish.comments.forEach(function (comment, id, comments) {
        comment.remove()
      })
      dish.save(function (err, result) {
        if (err) throw err
        res.json(result)
      })
    })
  })

dishRouter.route('/:id/comments/:commentId')
  .all(Verify.verifyOrdinaryUser)
  .get(function (req, res, next) {
    Dish.findById(req.params.id, function (err, dish) {
      if (err) throw err
      res.json(dish.comments.id(req.params.commentId))
    })
  })
  .put(function (req, res, next) {
    Dish.findById(req.params.id)
      .populate('comments.postedBy')
      .exec(function (err, dish) {
        if (err) throw err
        dish.comments.id(req.params.commentId).remove()
        req.body.postedBy = req.decoded._doc._id
        dish.comments.push(req.body)
        dish.save(function (err, dish) {
          if (err) throw err
          res.json(dish)
        })
      })
  })
  .delete(function (req, res, next) {
    Dish.findById(req.params.id, function (err, dish) {
      if (err) throw err
      if (dish.comments.id(req.params.commentId).postedBy != req.decoded._doc._id ||
          decoded._doc.admin !== true) {
        var err = new Error('You are not authorized to perform this operation')
        err.status = 403
        return next(err)
      }
      dish.comments.id(req.params.commentId).remove()
      dish.save(function (err, result) {
        if (err) throw err
        res.json(result)
      })
    })
  })

module.exports = dishRouter
