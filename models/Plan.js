var mongoose = require('mongoose'); 
var Schema   = mongoose.Schema; 

/* require user model */
var User = require('./User');

/* Define Plan Schema */
var Plan = new mongoose.Schema({
    name: String, 
    reps: Number, 
    sets: Number,
    part: String, 
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    } 
});

module.exports = mongoose.model('Plan', Plan);