var mongoose = require('./mongoose');

var listSchema = mongoose.Schema({
	locations: []
});

module.exports = mongoose.model('List', listSchema);