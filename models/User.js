var mongoose = require('mongoose'); 
var Schema   = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var Photo = require('./Photo');
var User  = require('./User');

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
  status:   String,

  photos: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Photo'
  }]

});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);