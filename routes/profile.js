var express = require('express');
var router = express.Router();
var User = require('../config/model_user');

/* GET specific list page. */
router.get('/', function(req, res, next) {
  res.render('profile', { title: 'My Profile' });
});

// render other profile (not current user)
router.get('/:id', function(req, res, next) {
  // lookup other user
  User.findById(req.params.id, function(err, user) {
    if (err)
      res.status(500);

    if (user) {
      res.render('profile', {
        title: 'User' + req.params.id,
        user: user
      });
    } else {
      res.status(500);
    }
  });
});

module.exports = router;
