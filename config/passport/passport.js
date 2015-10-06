//******************Local Strategy*************************
var localSignupStrategy = require('./local-signup-strategy');
var localLoginStrategy = require('./local-login-strategy');
var facebookLoginStrategy = require('./facebook-strategy');
var twitterLoginStrategy = require('./twitter-strategy');
var User = require('../../models/user');


var passportConfig = function(passport) {

  passport.use('local-signup', localSignupStrategy);
  passport.use('local-login', localLoginStrategy);
  passport.use('facebook', facebookLoginStrategy);
  passport.use('twitter', twitterLoginStrategy);

// Passport session setup.
passport.serializeUser(function(user, callback) {
  //console.log("serializing " + user.username);
  callback(null, user._id);
});

passport.deserializeUser(function(id, callback) {
  User.findById(id, function(err, user){
    if (!err) callback(null, user);
    else callback(err, null)
  });
});
};
module.exports = passportConfig;
