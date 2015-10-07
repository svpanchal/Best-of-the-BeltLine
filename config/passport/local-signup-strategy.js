var LocalStrategy = require('passport-local').Strategy;
var User = require('../../Models/User');

var strategy = new LocalStrategy(
  {
    usernameField : 'email',       // default for usernameField is 'username'
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, callback) {
    // See if a user already has this email
    User.findOne({ 'local.email' : email }, function(err, user) {
      if (err) return callback(err);
      if (user) {
        // a user with this email already exists
        return callback(null, false, req.flash('error', 'This email is already taken.'));
      }
      else {
        // Create a new user
        var newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.encrypt(password);
        newUser.local.created = Date.now();
        newUser.local.lastName = req.param('lastName');
        newUser.local.firstName = req.param('firstName');


        newUser.save(function(err) {
          return callback(err, newUser);
        });
      }
    });
  }
);

module.exports = strategy;
