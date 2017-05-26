var express = require('express');
var router = express.Router();
var User = require('../config/model_user');
var List = require('../config/model_list');

// TODO: no authentication middleware built (yet!). possibly do later once data is sorted out.

// create new list, assuming that data is perfectly formed
router.post('/newList', function(req, res) {
  console.log("POST /newList request: ", req.body);
  // check for valid input
  if (req.user && req.body.title && (req.body.locations.length > 0)) {
    // locate user to populate to associated lists
    User.findById(req.user._id, function(err, user) {
      if (err) res.status(500).send(err);
      if (user) {
        console.log("POST /newList FOUND:" + user);
        // save list
        var newList = new List();
        newList.author = req.user._id;
        newList.title = req.body.title;
        newList.description = req.body.description;
        newList.locations = req.body.locations;
        newList.tags = req.body.tags;
        newList.startCoords = req.body.startCoords;
        newList.url = "/list/" + generateURL();
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
                res.status(200).send(newList.url);
              }
            });
          }
        });
      } else {
        res.status(404).send("No user found");
      }
    });
  } else {
    res.status(404).send("Invalid input!");
  }
});

// generate unique id
// TODO: avoid collisions
function generateURL() {
  var url = "";
  var possible = "abcdefghijklmnopqrstuvwxyz1234567890";
  for (var i=0; i < 5; i++) {
    url += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return url;
}

// retrieves all lists under current user
router.get('/myLists', function(req, res) {
  if (req.user) {
    // lookup user and populate list ref with the actual lists
    User.findById(req.user._id).populate('lists').exec(function(err, user) {
      if (err) res.status(500).send(err);
      if (!user) {
        res.status(404).send("User not found!");
      } else {
        res.status(200).send(user.lists);
      }
    });
  } else {
    res.status(404).send("No user found");
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

router.post('/favorite', function(req, res) {
  if (req.user) {
    User.findById(req.user._id, function(err, user) {
      console.log(req.body);
    });
  } else {
    res.status(404).send("Invalid user");
  }
});

module.exports = router;
