module.exports = function (app) {
  var MongoDB = app.datasources.MongoDB
  MongoDB.automigrate('Customer', function (err) {
    if (err) throw err
    var Customer = app.models.Customer
    Customer.create([
      {username: 'admin', email: 'test@test.com', password: 'password'},
      {username: 'user', email: 'test2@test.com', password: 'password'}
    ], function (err, users) {
      if (err) throw err
      var Role = app.models.Role
      var RoleMapping = app.models.RoleMapping

      Role.create({name: 'admin'}, function (err, role) {
        if (err) throw err
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: users[0].id
        }, function (err) {
          if (err) throw err
        })
      })
    })
  })
}
