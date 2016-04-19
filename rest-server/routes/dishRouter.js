var express = require('express')
var bodyParser = require('body-parser')

var Dishes = require('../models/dishes')

var dishRouter = express.Router()
dishRouter.use(bodyParser.json())

dishRouter.route('/')
  .get(function (req, res, next) {
    Dishes.find({}, function (err, dishes) {
      if (err) throw err
      res.json(dishes)
    })
  })
  .post(function (req, res, next) {
    Dishes.create(req.body, function (err, dish) {
      if (err) throw err
      console.log('Dish created')
      var id = dish._id
      res.writeHead(200, {'Content-type': 'text/plain'})
      res.end('Added dish with id: ' + id)
    })
  })
  .delete(function (req, res, next) {
    Dishes.remove({}, function (err, resp) {
      if (err) throw err
      res.json(resp)
    })
  })

dishRouter.route('/:id')
  .get(function (req, res, next) {
    Dishes.findById(req.params.id, function (err, dish) {
      if (err) throw err
      res.json(dish)
    })
  })
  .put(function (req, res, next) {
    Dishes.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function (err, dish) {
      if (err) throw err
      res.json(dish)
    })
  })
  .delete(function (req, res, next) {
    Dishes.remove(req.params.id, function (err, resp) {
      if (err) throw err
      res.json(resp)
    })
  })

dishRouter.route('/:id/comments')
  .get(function (req, res, next) {
    Dishes.findById(req.params.id, function (err, dish) {
      if (err) throw err
      res.json(dish.comments)
    })
  })
  .post(function (req, res, next) {
    Dishes.findById(req.params.id, function (err, dish) {
      if (err) throw err
      dish.comments.push(req.body)
      dish.save(function (err, dish) {
        if (err) throw err
        res.json(dish)
      })
    })
  })
  .delete(function (req, res, next) {
    Dishes.findById(req.params.id, function (err, dish) {
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
  .get(function (req, res, next) {
    Dishes.findById(req.params.id, function (err, dish) {
      if (err) throw err
      res.json(dish.comments.id(req.params.commentId))
    })
  })
  .put(function (req, res, next) {
    Dishes.findById(req.params.id, function (err, dish) {
      if (err) throw err
      dish.comments.id(req.params.commentId).remove()
      dish.comments.push(req.body)
      dish.save(function (err, dish) {
        if (err) throw err
        res.json(dish)
      })
    })
  })
  .delete(function (req, res, next) {
    Dishes.findById(req.params.id, function (err, dish) {
      if (err) throw err
      dish.comments.id(req.params.commentId).remove()
      dish.save(function (err, result) {
        if (err) throw err
        res.json(result)
      })
    })
  })

module.exports = dishRouter
