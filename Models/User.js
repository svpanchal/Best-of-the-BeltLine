var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Event = require('./Event');
var Schema = mongoose.Schema;

//===============Passport=============
var UserSchema = new Schema({
    local :{
      email: String,
      password: String,
      firstName: String,
      lastName: String
    }
     //will add comments here
});

module.exports = mongoose.model('User', UserSchema);
