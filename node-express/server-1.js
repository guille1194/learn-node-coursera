var express = require('express'),
    http = require('http')

var hostname = 'localhost',
    port = 3000

var app = express()

app.use(function(req, res, next) {
    console.log(req.headers)

    res.writeHead(200, {'Content-type': 'text/html'})
    res.end('Hello world')
})

var server = http.createServer(app)

server.listen(port, hostname, function() {
    console.log('Server listening at http://' + hostname + ':' + port)
})
