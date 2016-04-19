var MongoClient = require('mongodb').MongoClient
var assert = require('assert')

var dboper = require('./operations')
var url = 'mongodb://localhost:27017/conFusion'

MongoClient.connect(url, function (err, db) {
  assert.equal(err, null)
  console.log('Connected to MongoDB server')

  dboper.insertDocument(db, {name: 'Vadonut', description: 'test'}, 'dishes', function (result) {
    console.log(result.ops)
    dboper.findDocuments(db, 'dishes', function (docs) {
      console.log(docs)
      dboper.updateDocument(db, {name: 'Vadonut'}, {description: 'updated test'}, 'dishes', function (result) {
        dboper.findDocuments(db, 'dishes', function (docs) {
          console.log(docs)
          db.dropCollection('dishes', function (err, result) {
            assert.equal(err, null)
            db.close()
          })
        })
      })
    })
  })
})
