var mongoose = require('./mongoose');
var Schema = mongoose.Schema;

var listSchema = Schema({
  url: String,
  title: String,
  description: String,
  dateCreated: Date,
  dateUpdated: Date,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  locations: [{ name: String, address: String }],
  tags: [],
  startCoords: { long: Number, lat: Number },
  favoriteCount: 0
});

// pre save middleware
listSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.dateUpdated = currentDate;
  if (!this.dateCreated)
    this.dateCreated = currentDate;
  next();
});

module.exports = mongoose.model('List', listSchema);
