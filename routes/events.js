var express = require('express');
var router = express.Router();
var Event = require('../models/event');

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
};
//INDEX
router.get('/', authenticate, function(req, res, next) {
  Event.find({}, function(err, myEvents) {
    if (err) return next(err);
    res.render('events/index', { myEvents: myEvents, message: req.flash(), title: "Events Index Page" });
  });
});

// NEW
router.get('/new', authenticate, function(req, res, next) {
    var myEvent = {
      title: '',
      category: '',
      location: '',
      date: Date.now()
    };
    res.render('events/new', { myEvent: myEvent, message: req.flash()});

});

//SHOW specific event
router.get('/:id', function(req, res, next) {
  Event.findById(req.params.id, function (err, myEvent) {
    if (err) return next(err);
    res.render('events/show', { myEvent: myEvent, message: req.flash() });
  });
});

//EDIT event
router.get('/:id/edit', authenticate, function (req, res, next) {
  Event.findById(req.params.id, function (err, myEvent) {
    if (err) return next(err);
    if (!myEvent) return next(makeError(res, 'Document not found', 404));
  res.render('events/edit', { myEvent: myEvent, message: req.flash(), title: "Test" });
  });
});

//CREATE a new event
router.post('/', authenticate, function(req, res, next) {
  console.log('req: '+req);
  var myEvent = {
    title: req.body.title,
    category: req.body.category,
    location: req.body.location,
    date: req.body.date
  };
  Event.create(myEvent, function (err, saved) {
    if (err) return next(err);
    res.redirect('/events');
  });
});
  // currentUser.events.push(myEvent);
  // currentUser.save(function (err) {
  //   if (err) return next(err);
  //   res.redirect('/events');
  // });

//UPDATE an event
router.put('/:id', authenticate, function (req, res, next) {
  Event.findById(req.params.id, function (err, myEvent) {
    if (err) return next(err);
    if (!myEvent) return next (makeError(res, 'Document not found', 404));
    else {
      myEvent.title = req.body.title;
      myEvent.category = req.body.category;
      myEvent.location = req.body.location;
      myEvent.date = req.body.date;
      console.log('This is the request: ' + JSON.stringify(req.body));
      console.log('This is my event' + myEvent);
      myEvent.save(function(err) {
        if (err) return next(err);
        res.redirect('/events');
      });
    }
  });
});

//DELETE an event
router.delete('/:id', authenticate, function(req, res, next) {
  Event.findByIdAndRemove(req.params.id, function(err, todo) {
    if (err) return next(err);
    if(!myEvent) return next(makeError(res, 'Document not found', 404));
    res.redirect('/events');
  });
});

module.exports = router;
