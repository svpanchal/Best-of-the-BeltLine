var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
//var User = require('./user');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
      title: String,
      date: Date,
      location: String,
      category: String
});

EventSchema.methods.toString = function() {
  return (this.title + ' ' +  this.location + ' ' + this.category);
};

module.exports = mongoose.model('Event', EventSchema);
