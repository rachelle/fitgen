var mongoose = require('mongoose'); 
var Schema   = mongoose.Schema; 

/* required models */
var User = require('./User'); 
var Meal = require('./Meal'); 

/* Define Meal Schema model */

var Meal = new mongoose.Schema({
    meal_name:      String, 
    drink_name:     String, 
    meal_cals:      String, 
    drink_cals:     String, 
    meal_protein:   String, 
    drink_protein:  String,
    snack_name:     String, 
    snack_cals:     String, 
    snack_protein:  String, 
    user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
    } 
});

/* exports Schema */
module.exports = mongoose.model('Meal', Meal);
