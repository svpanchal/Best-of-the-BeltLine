var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home Page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Best of the BeltLine' });
});

/* GET About Page */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Best of the BeltLine' });
});


/* GET Show Page */
router.get('/show', function(req, res, next) {
  res.render('show', { title: 'Welcome!' });
});

//******** Passport Routes **********
//displays our signin page
router.get('/signin', function(req, res){
  res.render('signin', {title: 'Signin'});
});
//displays our signup page
router.get('/signup', function(req, res){
  res.render('signup', {title: 'Signup'});
});

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/local-reg', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signin',
  failureFlash: true
  })
);

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

//logs user out of site, deleting them from the session, and returns to homepage
router.get('/logout', function(req, res){
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});
//**************Facebook routes**************
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/signin' }));
//**************Twitter routes******************
// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
router.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/signin' }));
//*******************************************
module.exports = router;
