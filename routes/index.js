var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home Page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Best of the BeltLine' });
});

/* GET home Page. */
router.get('/show', function(req, res, next) {
  res.render('show', { title: 'Best of the BeltLine' });
});

/* GET About Page */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Best of the BeltLine' });
});

//******** Passport Routes **********
//displays our signin page
var authenticate = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  }
  else {
    next();
  }
};
router.get('/login', function(req, res, next){
  res.render('signin', {title: "Sign In", message: req.flash() });
});
//displays our signup page
router.get('/signup', function(req, res, next){
  res.render('signup', {title: "Sign Up", message: req.flash()});
});
router.get('/profile', authenticate, function(req, res) {
        res.render('profile', {
        user : req.user // get the user out of session and pass to template
        });
    });

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/signup', function(req, res, next) {
  var signUpStrategy = passport.authenticate('local-signup', {
  successRedirect: '/show',
  failureRedirect: '/signup',
  failureFlash: true
  });
  return signUpStrategy(req, res, next);
});


//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/login', function(req, res, next){
  var loginProperty = passport.authenticate('local-login', {
  successRedirect: '/show',
  failureRedirect: '/signup',
  failureFlash: true
  });
  return loginProperty(req, res, next);
});

//logs user out of site, deleting them from the session, and returns to homepage
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out!";
});
//**************Facebook routes**************
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook', {authType: 'reauthenticate', scope: ['email']}), function(req, res){
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
  passport.authenticate('facebook', { authType: 'reauthenticate',
                                      successRedirect: '/profile',
                                      failureRedirect: '/login' }));
//**************Twitter routes******************
// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
router.get('/auth/twitter', passport.authenticate('twitter', {scope: 'email'}),
function(req, res){
});

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  authType: 'reauthenticate',
  successRedirect: '/show',
  failureRedirect: '/login' }));
/* GET Twitter View Page */
// router.get('/twitter', isAuthenticated, function(req, res){
//   res.render('twitter', { user: req.user });
// });
//*******************************************
module.exports = router;
