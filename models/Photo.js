var mongoose = require("mongoose"); 
var Scehme   = mongoose.Schema; 

/* require user model */
var User = require('./User'); 

/* Define Photo Schema */
var Photo = new mongoose.Scehma({
    url:      String, 
    image:    String, 
    caption:  String,
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    } 
});

/* exports Schema */
module.exports = mongoose.model('Photo', Photo);