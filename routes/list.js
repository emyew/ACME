var express = require('express');
var router = express.Router();
var List = require('../config/model_list');

/* GET specific list page. */
router.get('/:id', function(req, res, next) {
  // lookup list, render if found
  List.findOne({url: req.params.id}).populate('author').exec(function(err, list) {
    if (err) res.status(404).send(err);
    if (!list) {
      res.status(404).redirect('../404');
    } else {
      res.render('list', list);
    }
  });
});

module.exports = router;
