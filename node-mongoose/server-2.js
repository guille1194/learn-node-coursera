var mongoose = require('mongoose')
var Dishes = require('./models/dishes-1')

var url = 'mongodb://localhost:27017/conFusion'
mongoose.connect(url)
var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function () {
  console.log('connected to server')
  Dishes.create({
    name: 'Uthapizza',
    description: 'test'
  }, function (err, dish) {
    if (err) throw err
    console.log('dish created')
    console.log(dish)

    var id = dish._id
    setTimeout(function () {
      Dishes.findByIdAndUpdate(id, {$set: {description: 'updated test'}}, {new: true})
        .exec(function (err, dish) {
          if (err) throw err
          console.log('updated dish')
          console.log(dish)
          db.collection('dishes').drop(function () {
            db.close()
          })
        })
    }, 3000)
  })
})
