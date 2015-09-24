var mongoose = require('mongoose'); 
var Schema   = mongoose.Schema; 

/* require user model */
var User     = require('./User');
var Exercise = require('./Exercise');


var Exercise = new mongoose.Schema({
    description: String, 
    date: Date, 
    reps: Number,
    sets: Number,
    name: String,  
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
      }
}); 

/* exports Schema */
module.exports = mongoose.model('Exercise', Exercise); 
