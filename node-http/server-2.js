var http = require('http')
var fs = require('fs')
var path = require('path')

var hostname = 'localhost'
var port = 3000

var server = http.createServer(function (req, res) {
  console.log('Request for ' + req.url + ' by method ' + req.method)
  if (req.method === 'GET') {
    var fileUrl, filePath, fileExt
    if (req.url === '/') {
      fileUrl = 'index.html'
    } else {
      fileUrl = req.url
    }
    filePath = path.resolve('./public/' + fileUrl)
    fileExt = path.extname(filePath)

    if (fileExt === '.html') {
      fs.exists(filePath, function (exists) {
        if (!exists) {
          res.writeHead(404, {'Content-type': 'text/html'})
          res.end('File ' + fileUrl + ' does not exist')
          return
        }
        res.writeHead(200, {'Content-type': 'text/html'})
        fs.createReadStream(filePath).pipe(res)
      })
    } else {
      res.writeHead(404, {'Content-type': 'text/html'})
      res.end('File ' + fileUrl + ' is not an HTML file')
    }
  } else {
    res.writeHead(403, {'Content-type': 'text/html'})
    res.end('File ' + req.method + ' is not supported')
  }
})

server.listen(port, hostname, function () {
  console.log('Server running at http://' + hostname + ':' + port)
})
