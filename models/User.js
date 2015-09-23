var mongoose = require('mongoose'); 
var Schema   = mongoose.Schema; 
var passportLocalMongoose = require('passport-local-mongoose');

/* require user model */
var User = require('./User'); 

/* Define Plan Schema */
var User = new mongoose.Schema({
  /* the passport-local-mongoose module */
  /* creates the username and email for the User */

  name:     String, 
  weight:   Number, 
  url:      String, 
  avatar:   String, 
  height:   Number,
  image:    String, 
  status:   String

});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);