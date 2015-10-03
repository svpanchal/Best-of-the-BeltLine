var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var User = require('./User');
var Schema = mongoose.Schema;


var EventSchema = new Schema({
      name: String,
      date: Date,
      location: [{type: mongoose.Schema.ObjectId, ref: 'Location'}],
      category: String
});



module.exports = mongoose.model('Event', EventSchema);
