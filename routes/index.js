var express = require('express');
var router = express.Router();

/* GET home Page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Best of the BeltLine' });
});

/* GET About Page */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Best of the BeltLine' });
});

module.exports = router;
