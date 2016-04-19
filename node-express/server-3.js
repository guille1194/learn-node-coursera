var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')

var hostname = 'localhost'
var port = 3000

var app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.all('/dishes', function (req, res, next) {
  res.writeHead(200, {'Content-type': 'text/plain'})
  next()
})
app.get('/dishes', function (req, res, next) {
  res.end('Will send the dishes to you!')
})
app.post('/dishes', function (req, res, next) {
  res.end('Will add the dish ' + req.body.name + ' with the details ' +
    req.body.description)
})
app.delete('/dishes', function (req, res, next) {
  res.end('Deleting all the dishes')
})
app.get('/dishes/:dishId', function (req, res, next) {
  res.end('Will send the details of dish: ' + req.params.dishId)
})
app.put('/dishes/:dishId', function (req, res, next) {
  res.write('Updating the dish ' + req.params.dishId)
  res.end('Will update the dish: ' + req.body.name + ' with the details ' +
    req.body.description)
})
app.delete('/dishes/:dishId', function (req, res, next) {
  res.end('Deleting dish: ' + req.params.dishId)
})
app.use(express.static(__dirname + '/public'))

app.listen(port, hostname, function () {
  console.log('Server listening at http://' + hostname + ':' + port)
})
