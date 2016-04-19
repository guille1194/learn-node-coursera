var express = require('express')
var morgan = require('morgan')

var dishRouter = require('./dishRouter')
var promoRouter = require('./promoRouter')
var leaderRouter = require('./leaderRouter')

var hostname = 'localhost'
var port = 3000
var app = express()
app.use(morgan('dev'))

app.use('/dishes', dishRouter)
app.use('/leadership', leaderRouter)
app.use('/promotions', promoRouter)

app.listen(port, hostname, function () {
  console.log('Server listening at http://' + hostname + ':' + port)
})
