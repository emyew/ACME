var express = require('express');
var router = express.Router();

/* GET explore page */
router.get('/', function(req, res, next) {
  res.render('edit', { title: 'Edit' });
});

module.exports = router;
