var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_4ngq2414:c13ru8jce90u7u0vuvtuovaq6d@ds143191.mlab.com:43191/heroku_4ngq2414');

mongoose.connection.on('connected', function() {
  console.log('mLab mongoDB connection open');
});

mongoose.connection.on('error', function(err) {
  console.error('MongoDB error: %s', err);
});

module.exports = mongoose;
