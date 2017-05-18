var express = require('express');
var router = express.Router();
var User = require('../config/model_user');
var List = require('../config/model_list');

// note: no authentication middleware built (yet!). possibly do later once data
// is sorted out.

// create new list, assuming that data is perfectly formed
router.post('/newList', function(req, res) {

  // create new list
  console.log(req.body);
  var newList = new List();
  newList.title = req.body.title;
  newList.description = req.body.description;
  newList.author = req.user._id;
  newList.locations = req.body.locations;
  newList.tags = req.body.tags;

  // save list
  newList.save(function(err) {
    if (err)
      res.status(500).send(err);
  });

  // locate user to populate to associated lists
  User.findById(req.user._id, function(err, user) {
    console.log("FOUND:" + user);

    if (err)
      res.status(500).send(err);
    if (user) {
      // update list and update user
      user.lists.push(newList._id);
      user.save(function(err) {
        if (err)
          res.status(500).send(err);
      });
    }
  });

  res.send(newList);
});

// retrieves all lists under current user
router.get('/myLists', function(req, res) {
  if (req.user) {
    // lookup user and populate list ref with the actual lists
    User.findById(req.user._id).populate('lists').exec(function(err, user) {
      if (err)
        res.status(500).send(err);
      res.send(user.lists);
    });
  } else {
    res.redirect('404');
  }
});

// query email address if taken
router.get('/query', function(req, res) {
    console.log(req.query.email);
    User.findOne({ 'email': req.query.email }, function(err, user) {
        if (user) {
            res.send(false);
        } else {
            res.send(true);
        }
    });
});

module.exports = router;
