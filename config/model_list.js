var mongoose = require('./mongoose');

var listSchema = mongoose.Schema({
	title: String,
	description: String,
	dateCreated: Date,
	dateUpdated: Date,
	author: String,
	locations: [],
	tags: [],
	listID: Schema.Types.ObjectId
});

module.exports = mongoose.model('List', listSchema);