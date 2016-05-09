var express = require('express')
var passport = require('passport')
var User = require('../models/user')
var Verify = require('./verify')

var usersRouter = express.Router()

/* GET users listing. */
usersRouter.route('/')
  .get(Verify.verifyAdmin, function(req, res, next) {
    User.find({}, function(err, users) {
      if(err) throw err
      res.json(users)
    })
});

usersRouter.post('/register', function(req, res) {
  User.register(
    new User({username: req.body.username}),
    req.body.password,
    function(err, user) {
      if (err) {
        return res.status(500).json({err: err})
      }
      if(req.body.firstName) {
        user.firstName = req.body.firstName
      }
      if(req.body.lastName) {
        user.lastName = req.body.lastName
      }
      user.save(function(err, user) {
        passport.authenticate('local')(req, res, function() {
          return res.status(200).json({status: 'Registration successful'})
        })
      })
    })
})

usersRouter.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info){
    if (err) {
      return next(err)
    }
    if(!user){
      return res.status(401).json({err, info})
    }
    req.login(user, function(err){
      if(err) {
        return res.status(500).json({err: 'Could not login'})
      }
      var token = Verify.getToken(user)
      res.status(200).json({
        status: 'Login successful',
        success: true,
        token: token
      })
    })
  })(req, res, next)
})

usersRouter.get('/logout', function (req, res) {
  req.logout()
  res.status(200).json({status: 'Bye!'})
})

module.exports = usersRouter;
