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
      lastName: String,
      oauthID: Number,
      created: Date
    }
     //will add comments here like:== comments: [Comment.schema] ==
});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
