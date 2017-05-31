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
        newList.favoriteCount = 0;
        newList.coords = {
          type: "Point",
          coordinates: [req.body.loc.long, req.body.loc.lat]
        };
        newList.url = generateURL();
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
                res.status(200).send("/list/" + newList.url);
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
  for (var i = 0; i < 5; i++) {
    url += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return url;
}

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
      if (err) res.status(500).send(err);
      if (user) {
        // update favorites
        if (user.favorites.indexOf(req.body.id) > -1) {
          res.status(500).send("Already favorited!");
        } else {
          // add list to user favs
          user.favorites.push(req.body.id);
          user.save(function(err) {
            if (err) res.status(500).send(err);
            // increase favorite count of list
            List.findById(req.body.id, function(err, list) {
              list.favoriteCount++;
              list.save(function(err) {
                if (err) res.status(500).send(err);
                res.status(200).send(true);
              });
            });
          });


        }
      }
    });
  } else {
    res.status(404).send("Invalid user");
  }
});

router.post('/unfavorite', function(req, res) {
  if (req.user) {
    User.findById(req.user._id, function(err, user) {
      if (err) res.status(500).send(err);
      if (user) {
        // update favorites
        index = user.favorites.indexOf(req.body.id);
        if (index > -1) {
          user.favorites.splice(index, 1);
          user.save(function(err) {
            if (err) res.status(500).send(err);           
            // decrease favorite count of list
            List.findById(req.body.id, function(err, list) {
              list.favoriteCount--;
              list.save(function(err) {
                if (err) res.status(500).send(err);
                res.status(200).send(true);
              });
            });
          });
        } else {
          res.status(500).send("Not in favorites!");
        }
      }
    });
  } else {
    res.status(404).send("Invalid user");
  }
});

router.post('/deleteList', function(req, res) {
  if (req.user) {
    User.findById(req.user._id, function(err, user) {
      if (err) res.status(500).send(err);
      if (user) {
        // find list in user's list
        favindex = user.favorites.indexOf(req.body.id);
        listindex = user.lists.indexOf(req.body.id);
        if (listindex <= -1) {
          res.status(500).send("Not current user's list!");
        } else {
          // remove from favorites and lists
          if (favindex > -1) {
            user.favorites.splice(favindex, 1);
          }
          user.lists.splice(listindex, 1);
          user.save(function(err) {
            if (err) res.status(500).send(err);
            // delete list
            List.findByIdAndRemove(req.body.id, function(err, list) {
              if (err) res.status(500).send(err);
              res.status(200).send("Deleted" + list.id);
            });
          });
        }
      }
    });
  } else {
    res.status(404).send("Invalid user");
  }
});

router.post('/editList', function(req, res) {
  console.log("POST /editList request: ", req.body);
  // check for valid input
  if (req.user && req.body.title && (req.body.locations.length > 0)) {
    // locate user to populate to associated lists
    User.findById(req.user._id, function(err, user) {
      if (err) res.status(500).send(err);
      if (user) {
        // lookup list
        List.findById(req.body.id, function(err, list) {
          if (err) res.status(500).send(err);
          // edit fields and save
          list.title = req.body.title;
          list.description = req.body.description;
          list.locations = req.body.locations;
          list.tags = req.body.tags;
          list.coords = {
            type: "Point",
            coordinates: [req.body.loc.long, req.body.loc.lat]
          };
          list.save(function(err) {
            if (err) res.status(500).send(err);
            res.status(200).send("/list/" + list.url);
          });
        });
      } else {
        res.status(404).send("No user found");
      }
    });
  } else {
    res.status(404).send("Invalid input!");
  }
});

router.post('/editBio', function(req, res) {
  if (req.user) {
    User.findById(req.user._id, function(err, user) {
      if (err) res.status(500).send(err);
      if (user) {
        user.name = req.body.name;
        user.bio = req.body.bio;
        user.save(function(err) {
          if (err) res.status(500).send(err);
          res.status(200).send("Successfully changed");
        });
      }
    });
  }
});

router.post('/editEmail', function(req, res) {
  if (req.user) {
    User.findById(req.user._id, function(err, user) {
      if (err) res.status(500).send(err);
      if (user) {
        user.email = req.body.email;
        user.save(function(err) {
          if (err) res.status(500).send(err);
          res.status(200).send("Successfully changed");
        });
      }
    });
  }
});

router.post('/editPassword', function(req, res) {
  if (req.user) {
    User.findById(req.user._id, function(err, user) {
      if (err) res.status(500).send(err);
      if (user) {
        user.password = user.generateHash(req.body.pw);
        user.save(function(err) {
          if (err) res.status(500).send(err);
          res.status(200).send("Successfully changed");
        });
      }
    });
  }
});
module.exports = router;
