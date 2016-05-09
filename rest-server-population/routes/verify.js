var User = require('../models/user')
var jwt = require('jsonwebtoken')
var config = require('../config')

exports.getToken = function(user) {
  return jwt.sign(user, config.secretKey, {
    expiresIn: 3600
  })
}

exports.verifyOrdinaryUser = function(req, res, next) {
  function extraRules(decoded) {
    return true
  }
  verifyUser(req, res, next, extraRules)
}

exports.verifyAdmin = function(req, res, next) {
  function extraRules(decoded) {
    return decoded._doc.admin === true
  }
  return verifyUser(req, res, next, extraRules)
}

function verifyUser(req, res, next, extraRules) {
  var token = req.body.token || req.query.token || req.headers['x-access-token']

  if(token) {
    jwt.verify(token, config.secretKey, function(err, decoded) {
      if(err || !extraRules(decoded)) {
        var err = new Error('Not authorized')
        err.status = 401
        return next(err)
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    var err = new Error('No token provided')
    err.status = 403
    return next(err)
  }
}
