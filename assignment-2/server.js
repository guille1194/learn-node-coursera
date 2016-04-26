var mongoose = require('mongoose')
var Dishes = require('./models/dishes')
var Promotions = require('./models/promotions')
var Leaderships = require('./models/leaderships')

var url = 'mongodb://localhost:27017/conFusion'
mongoose.connect(url)
var db = mongoose.connection
var waiting = 0

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function () {
  console.log('connected to server')
  waiting++
  Dishes.create({
    name: 'Uthapizza',
    image: 'test/image.jpg',
    category: 'category',
    price: 10.99,
    description: 'test',
    comments: [{
      rating: 3,
      comment: 'wat',
      author: 'matjack'
    }]
  }, function (err, dish) {
    if (err) throw err
    console.log('dish created')
    console.log(dish)

    var id = dish._id
    setTimeout(function () {
      Dishes.findByIdAndUpdate(id, {$set: {label: 'updated label'}}, {new: true})
        .exec(function (err, dish) {
          if (err) throw err
          console.log('updated dish')
          console.log(dish)

          dish.comments.push({
            rating: 5,
            comment: 'wat wat',
            author: 'always me'
          })
          dish.save(function (err, dish) {
            if (err) throw err
            console.log('updated comment')
            console.log(dish)

            db.collection('dishes').drop(function () {
              waiting--
              closeDb()
            })
          })
        })
    }, 3000)
  })

  waiting++
  Promotions.create({
    name: 'Pizzapromo',
    image: 'test/promotion.jpg',
    price: 10.99,
    description: 'test'
  }, function (err, promotion) {
    if (err) throw err
    console.log('promotion created')
    console.log(promotion)

    var id = promotion._id
    setTimeout(function () {
      Promotions.findByIdAndUpdate(id, {$set: {label: 'new label'}}, {new: true})
        .exec(function (err, promotion) {
          if (err) throw err
          console.log('updated promotion')
          console.log(promotion)
          waiting--
          closeDb()
        })
    }, 3000)
  })

  waiting++
  Leaderships.create({
    name: 'Mat Jack',
    image: 'test/matjack.jpg',
    designation: 'blah blah',
    abbr: 'bla',
    description: 'test'
  }, function (err, leadership) {
    if (err) throw err
    console.log('leadership created')
    console.log(leadership)
    waiting--
    closeDb()
  })
})

function closeDb () {
  if (waiting === 0) {
    db.collection('dishes').drop(
      db.collection('promotions').drop(
        db.collection('leaderships').drop(
          db.close()
        )
      )
    )
  }
}
