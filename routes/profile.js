var express = require('express');
var router = express.Router();

/* GET specific list page. */
router.get('/', function(req, res, next) {
    res.render('profile', { title: 'My Profile' });
});

module.exports = router;
