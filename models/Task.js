var mongoose = require('mongoose'); 
var Schema   = mongoose.Schema; 

/* required user model */
var User = require('./User');

/* Define Task Schema */

var Task = new mongoose.Schema({
    tasks: String,
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    } 
});

/* exports Schema */
module.exports = mongoose.model('Task', Task);