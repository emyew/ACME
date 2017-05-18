var mongoose = require('./mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = Schema({
  name: String,
  email: String,
  password: String,
  dateCreated: Date,
  dateUpdated: Date,
  favorites: [],
  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }]
});

userSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.dateUpdated = currentDate;
  if (!this.dateCreated)
    this.dateCreated = currentDate;
  next();
})

// generate hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// expose model to app
module.exports = mongoose.model('User', userSchema);;
