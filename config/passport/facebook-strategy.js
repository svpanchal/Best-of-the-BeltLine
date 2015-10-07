var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/user');
var config = require('../../oauth.js');

var strategy = new FacebookStrategy({
 clientID: config.facebook.clientID,
 clientSecret: config.facebook.clientSecret,
 callbackURL: config.facebook.callbackURL,
 profileFields: ['id', 'displayName', 'link', 'picture.type(large)', 'emails']
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function (){
    User.findOne({ oauthID: profile.id }, function(err, user) {
    if(err) { console.log(err); }
      if (!err && user != null) {
      done(null, user);
      } else {
    var user = new User();
      user.facebook.oauthID = profile.id;
      user.facebook.myname = profile.displayName;
      user.facebook.created = Date.now();
      user.facebook.email = profile.emails[0].value;
      user.facebook.photo = profile.photos[0].value;

   user.save(function(err) {
     if(err) {
       console.log(err);
     } else {
       console.log("saving user ...");
       done(null, user);
     };
   });
 };
});
});
});

module.exports = strategy;
