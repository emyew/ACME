var express = require('express');
var router = express.Router();
var List = require('../config/model_list');

router.get('/', function(req, res, next) {
  // aggregate db
  List.aggregate([{
    '$geoNear': {
      'near': { lng: -117.235277, lat: 32.877492 },
      'distanceField': 'dis',
      'spherical': true
    }
  }], function(err, result) {
    var render = {};
    render.lists = result;
    render.title = "Explore";
    console.log(render);
    res.render('explore', render);
  });
});

module.exports = router;
