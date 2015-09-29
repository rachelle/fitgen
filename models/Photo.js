var mongoose = require("mongoose"); 
var Schema   = mongoose.Schema; 

/* require user model */
var User    = require('./User'); 
var Photo   = require('./Photo');
var Comment = require('./Comment');

/* Define Photo Schema */
var Photo = new mongoose.Schema({
    url:      String, 
    image:    String, 
    caption:  String,
    comments: [Comment.schema],
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    } 
});

/* exports Schema */
module.exports = mongoose.model('Photo', Photo);