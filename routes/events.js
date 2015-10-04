var express = require('express');
var router = express.Router();
var Event = require('../models/event');

// NEW
router.get('/new', function(req, res, next) {
  if (req.isAuthenticated()) {
    var events = {
      name: '',
      category: '',
      location: '',
      date: Date
    };
    res.render('events/new', { event: event});
  }
  else {
    res.redirect('/');
  }
});
