var mongoose = require('mongoose'); 
var Schema   = mongoose.Schema; 

/* required models for comment */
var User    = require('./User'); 
var Photo   = require('./Photo'); 
var Comment = require('./Comment'); 

/* Defining Comment Schema */
var Comment = mongoose.model('Comment', CommentSchema); 
    content: String, 
    created: Date, 
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
    }, 

    photo: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Photo'
    }
}); 

/* exports Schema */
module.exports = mongoose.model('Comment', Comment);