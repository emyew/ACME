var express = require('express');
var router = express.Router();
var List = require('../config/model_list');

/* GET specific list page. */
router.get('/:id', function(req, res, next) {
  // lookup list, render if found
  List.findOne({url: req.params.id}).populate('author', 'name').exec(function(err, list) {
    if (err) res.status(404).send(err);
    if (!list) {
      res.status(404).redirect('../404');
    } else {
      list['favorited'] = req.user && (req.user.favorites.indexOf(list._id) > -1);
      if (req.user) {
        console.log(req.user._id);
        console.log(list.author._id);
        list['listOwner'] = (req.user.name === list.author.name);
        console.log(list['listOwner']);
      }
      res.render('list', list);
    }
  });
});

module.exports = router;
