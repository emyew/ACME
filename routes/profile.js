var express = require('express');
var router = express.Router();
var User = require('../config/model_user');

/* GET specific list page. */
router.get('/', function(req, res, next) {
  // check if user is logged in
  User.findById(req.user.id).populate('lists').exec(function(err, user) {
    if (err) res.status(404).send(err);
    if (!user) {
      res.status(404).redirect('../404');
    } else {
      // join title and user payload
      user.title = user.name;
      res.render('profile', user);
    }
  });
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
