//******************Local Strategy*************************
var localSignupStrategy = require('./local-signup-strategy');
var localLoginStrategy = require('./local-login-strategy');
//var facebookLoginStrategy = require('./facebook-strategy');
//var twitterLoginStrategy = require('./twitter-strategy');
var User = require('../../models/user');


var passportConfig = function(passport) {

  passport.use('local-signup', localSignupStrategy);
  passport.use('local-login', localLoginStrategy);
  //passport.use('facebook', facebookLoginStrategy);
  //pasport.use('twitter', twitterLoginStrategy);

// Use the LocalStrategy within Passport to register/"signup" users.

//**************Facebook Strategy****************************
// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: "http://www.example.com/auth/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate(..., function(err, user) {
//       if (err) { return done(err); }
//       done(null, user);
//     });
//   }
// ));

//************Twitter Strategy***************************
// passport.use(new TwitterStrategy({
//     consumerKey: TWITTER_CONSUMER_KEY,
//     consumerSecret: TWITTER_CONSUMER_SECRET,
//     callbackURL: "http://www.example.com/auth/twitter/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//     User.findOrCreate(..., function(err, user) {
//       if (err) { return done(err); }
//       done(null, user);
//     });
//   }
// ));

// Session-persisted message middleware
// app.use(function(req, res, next){
//   var err = req.session.error;
//   var msg = req.session.notice;
//   var success = req.session.success;

//   delete req.session.error;
//   delete req.session.success;
//   delete req.session.notice;

//   if (err) res.locals.error = err;
//   if (msg) res.locals.notice = msg;
//   if (success) res.locals.success = success;

//   next();
// });

// Passport session setup.
passport.serializeUser(function(user, callback) {
  //console.log("serializing " + user.username);
  callback(null, user.id);
});

passport.deserializeUser(function(id, callback) {
  User.findById(id, function(err, user){
    callback(err, user);
  });
});
};
module.exports = passportConfig;
