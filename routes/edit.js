var express = require('express');
var router = express.Router();
var List = require('../config/model_list');
var User = require('../config/model_user');

/* GET explore page */
router.get('/:id', function(req, res, next) {
  if (req.user) {
    User.findById(req.user._id, function(err, user) {
      if (err) res.status(404).send(err);
      if (user) {
        // lookup list id
        List.findOne({url: req.params.id}).exec(function(err, list) {
          if (err) res.status(404).send(err);
          // check if in list
          if (list && user.lists.indexOf(list._id) > -1) {
            res.render('edit', list);
          } else {
            res.status(404).send("No list found!");
          }
        });
      }
    })
  }
});

module.exports = router;
