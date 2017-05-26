var express = require('express');
var router = express.Router();
var User = require('../config/model_user');

/* GET specific list page. */
router.get('/', function(req, res, next) {
  // check if user is logged in
  console.log("ha");
  User.findById(req.user.id).populate('lists').exec(function(err, user) {
    console.log("PROFILE USER FOUND!");
    if (err) res.status(500).send(err);
    if (!user) {
      res.status(404).redirect('../404');
    } else {
      // join title and user payload
      user.title = user.name;
      res.render('mylists', user);
    }
  });
});


module.exports = router;
