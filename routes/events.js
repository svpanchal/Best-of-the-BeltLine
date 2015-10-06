var express = require('express');
var router = express.Router();
var Event = require('../models/Event');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

var authenticate = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  }
  else {
    next();
  }
}
//INDEX
router.get('/', authenticate, function(req, res, next) {
  var events = global.currentUser.events;
  res.render('events/index', {events: events, message: req.flash()})
});
// NEW
router.get('/new', authenticate, function(req, res, next) {
    var event = {
      name: '',
      category: '',
      location: '',
      date: Date.now
    };
    res.render('events/new', {event: event, message: req.flash()});
});

module.exports = router;
