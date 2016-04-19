var express = require('express')
var bodyParser = require('body-parser')

var dishRouter = express.Router()
dishRouter.use(bodyParser.json())
dishRouter.route('/')
  .all(function (req, res, next) {
    res.writeHead(200, {'Content-type': 'text/plain'})
    next()
  })
  .get(function (req, res, next) {
    res.end('Will send the dishes to you!')
  })
  .post(function (req, res, next) {
    res.end('Will add the dish ' + req.body.name + ' with the details ' +
      req.body.description)
  })
  .delete(function (req, res, next) {
    res.end('Deleting all the dishes')
  })

dishRouter.route('/:id')
  .all(function (req, res, next) {
    res.writeHead(200, {'Content-type': 'text/plain'})
    next()
  })
  .get(function (req, res, next) {
    res.end('Will send the details of dish: ' + req.params.id)
  })
  .put(function (req, res, next) {
    res.write('Updating the dish ' + req.params.id)
    res.end('Will update the dish: ' + req.body.name + ' with the details ' +
      req.body.description)
  })
  .delete(function (req, res, next) {
    res.end('Deleting dish: ' + req.params.id)
  })

module.exports = dishRouter
