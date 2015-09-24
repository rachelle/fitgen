var mongoose = require('mongoose'); 
var Schema   = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

/* required models for user */
var Photo     = require('./Photo');
var Exercise  = require('./Exercise');
var User      = require('./User');
var Meal      = require('./Meal');

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
  }],

  exercises: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise'
  }], 

  meals: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Meal'
  }]

});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);