var express = require('express');
var router = express.Router();
var redis = require('../redis');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'RoadRunner' });
});

// redis api for adding data
router.get('/:userid/list-:id', function(req, res) {
    redis.set(req.params.userid + "-lists", req.params.id, redis.print);
});

module.exports = router;
