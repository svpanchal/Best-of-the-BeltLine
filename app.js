var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var TwitterStrategy = require('passport-twitter');
var FacebookStrategy = require('passport-facebook');
var flash = require('connect-flash');
var expressLayouts = require('express-ejs-layouts');
var config = require('./oauth.js');
//**************************************
var routes = require('./routes/index');
var users = require('./routes/users');
var events = require('./routes/events');
//**************************************
var app = express();

// Connect to database
mongoose.connect('mongodb://localhost/events');
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
  }
);
mongoose.connection.once('open', function() {
  console.log("Mongoose has connected to MongoDB!");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.set('layout', 'layout');
//app.use(expressLayouts);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
//****** Configure Express ****************
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.session({ secret: 'sasswatchrule' }));
app.use(session({secret: 'sasswatchrule', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


//********** Passport Section ***************************
require('./config/passport/passport')(passport);

//***********************************************
app.use(function(req, res, next){
  global.currentUser = req.user;
  next();
});
//********** Routes ****************************
app.use('/', routes);
app.use('/users', users);
app.use('/events', events);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
var port = process.env.PORT || 5000; //select your port or let it pull from your .env file
app.listen(port);
console.log("listening on " + port + "!");
