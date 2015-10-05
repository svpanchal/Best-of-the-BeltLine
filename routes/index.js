var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home Page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Best of the BeltLine' });
});

/* GET About Page */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Best of the BeltLine' });
});

//******** Passport Routes **********
//displays our signin page
router.get('/login', function(req, res, next){
  res.render('signin');
});
//displays our signup page
router.get('/signup', function(req, res, next){
  res.render('signup');
});

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/signup', function(req, res, next) {
  var signUpStrategy = passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
  });
  return signUpStrategy(req, res, next);
});


//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/login', function(req, res, next){
  var loginProperty = passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
  });
  return loginProperty(req, res, next);
});

//logs user out of site, deleting them from the session, and returns to homepage
router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
  //req.session.notice = "You have successfully been logged out!";
});
//**************Facebook routes**************
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook'), function(req, res){
});

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.

// router.get('/auth/facebook/callback', passport.authenticate('facebook', {
//    failureRedirect: '/signup' }),
//    function(req, res) {
//       res.redirect('/');
// });
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));
//**************Twitter routes******************
// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
router.get('/auth/twitter', passport.authenticate('twitter'),
function(req, res){
});

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
failureRedirect: '/login' }),
function(req, res) {
 res.redirect('/');
});
//*******************************************
module.exports = router;
