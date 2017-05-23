var express = require('express');
var router = express.Router();
var User = require('../config/model_user');
var List = require('../config/model_list');

// note: no authentication middleware built (yet!). possibly do later once data
// is sorted out.

// create new list, assuming that data is perfectly formed
router.post('/newList', function(req, res) {
  console.log("GET /newList request: ", req.body);
  // check for valid input
  if (req.user && req.body.title && req.body.locations) {
    // locate user to populate to associated lists
    User.findById(req.user._id, function(err, user) {
      if (err) res.status(500).send(err);
      if (user) {
        console.log("GET /newList FOUND:" + user);
        // save list
        var newList = new List();
        newList.author = req.user._id;
        newList.title = req.body.title;
        newList.description = req.body.description;
        newList.locations = req.body.locations;
        newList.tags = req.body.tags;
        newList.save(function(err) {
          if (err) {
            res.status(500).send(err);
          } else {
            // update list and update user
            user.lists.push(newList._id);
            user.save(function(err) {
              if (err) {
                res.status(500).send(err);
              } else {
                res.send(newList);
              }
            });
          }
        });
      } else {
        res.status(404);
        res.send("No user found");
      }
    });
  } else {
    res.status(404);
    res.send("Invalid input!");
  }
});

// retrieves all lists under current user
router.get('/myLists', function(req, res) {
  if (req.user) {
    // lookup user and populate list ref with the actual lists
    User.findById(req.user._id).populate('lists').exec(function(err, user) {
      if (err) {
        res.status(500);
        res.send("GET /myLists error: ", err);
      }
      if (!user) {
        res.status(404);
        res.send("User not found!");
      } else {
        res.send(user.lists);
      }
    });
  } else {
    res.status(404);
  }
});

// query email address if taken
router.get('/query', function(req, res) {
  User.findOne({ 'email': req.query.email }, function(err, user) {
    if (user) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

module.exports = router;
