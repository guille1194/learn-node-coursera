var express = require('express')
var bodyParser = require('body-parser')

var leaderRouter = express.Router()
leaderRouter.use(bodyParser.json())
leaderRouter.route('/')
  .all(function (req, res, next) {
    res.writeHead(200, {'Content-type': 'text/plain'})
    next()
  })
  .get(function (req, res, next) {
    res.end('Will send the leaders to you!')
  })
  .post(function (req, res, next) {
    res.end('Will add the leader ' + req.body.name + ' with the details ' +
      req.body.description)
  })
  .delete(function (req, res, next) {
    res.end('Deleting all the leaders')
  })

leaderRouter.route('/:id')
  .all(function (req, res, next) {
    res.writeHead(200, {'Content-type': 'text/plain'})
    next()
  })
  .get(function (req, res, next) {
    res.end('Will send the details of leader: ' + req.params.id)
  })
  .put(function (req, res, next) {
    res.write('Updating the leader ' + req.params.id)
    res.end('Will update the leader: ' + req.body.name + ' with the details ' +
      req.body.description)
  })
  .delete(function (req, res, next) {
    res.end('Deleting leader: ' + req.params.id)
  })

module.exports = leaderRouter
