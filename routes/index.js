var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.redirect('/explore');   
  } else {
    res.render('index', { title: 'RoadRunner' });
  }
});

module.exports = router;
