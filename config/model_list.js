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
  tags: []
});

// pre save middleware
listSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.dateUpdated = currentDate;
  if (!this.dateCreated)
    this.dateCreated = currentDate;
  if (!this.url) {
    this.url = generateURL();
  }
  next();
});

// generate unique id
function generateURL() {
  var url = "";
  var possible = "abcdefghijklmnopqrstuvwxyz1234567890";
  for (var i=0; i < 5; i++) {
    url += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return url;
}

// test id recursively
function testValidURL(schema, url) {
  mongoose.model('List', listSchema).findOne({ 'url' : url }, function(err, data) {
    if (err || data) {
      testValidURL(schema, generateURL());
    } else {
      schema = url;
    }
  });  
}

module.exports = mongoose.model('List', listSchema);
