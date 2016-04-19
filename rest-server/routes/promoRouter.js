var express = require('express')
var bodyParser = require('body-parser')

var promoRouter = express.Router()
promoRouter.use(bodyParser.json())
promoRouter.route('/')
  .all(function (req, res, next) {
    res.writeHead(200, {'Content-type': 'text/plain'})
    next()
  })
  .get(function (req, res, next) {
    res.end('Will send the promotions to you!')
  })
  .post(function (req, res, next) {
    res.end('Will add the promotion ' + req.body.name + ' with the details ' +
      req.body.description)
  })
  .delete(function (req, res, next) {
    res.end('Deleting all the promotions')
  })

promoRouter.route('/:id')
  .all(function (req, res, next) {
    res.writeHead(200, {'Content-type': 'text/plain'})
    next()
  })
  .get(function (req, res, next) {
    res.end('Will send the details of promotion: ' + req.params.id)
  })
  .put(function (req, res, next) {
    res.write('Updating the promotion ' + req.params.id)
    res.end('Will update the promotion: ' + req.body.name + ' with the details ' +
      req.body.description)
  })
  .delete(function (req, res, next) {
    res.end('Deleting promotion: ' + req.params.id)
  })

module.exports = promoRouter
