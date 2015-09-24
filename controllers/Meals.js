var express   = require('express'); 
var mongoose  = require('mongoose');

/* source in required models */
var Meal = require('../models/Meal'); 
var User = require('../models/User'); 

/* require express router */
var router = express.Router(); 

/* get all user meals */
module.exports.renderMealsIndex = function(req, rex, next) {
  Meal.find(function(err, meals) {
    if (error) res.send('> ' + error); 
      res.render('./meals', 
      {
        meals: meals, 
        user:  req.user
      });
  });
};

/* renders a new meal for user */
module.exports.renderMealsNew = function(req, res) {
  var meals = Meal.all
    res.render('./meals/new', {user: req.user, meals:meals});
};

/* creates a new meal */
module.exports.renderMealsCreate = function(req, res, next) {
  var meal = new Meal({
    meal_name: req.body.meal_name, 
    drink_name: req.body.drink_name, 
    meal_cals: req.body.meal_cals, 
    drink_cals: req.body.drink_cals, 
    meal_protein: req.body.meal_protein, 
    drink_protein: req.body.drink_protein, 
    snack_name: req.body.snack_name, 
    snack_cals: req.body.snack_cals, 
    snack_protein: req.body.snack_protein,
    user_id: req.user
  });
  console.log(req.body); 
  meal.save(function(error){
    if(error){ res.send('> ' + error);}
      req.user.meals.push(exercise); 
      req.user.save();
      res.redirect('./meals/' + meal.id); 
  });
};

/* edit users meal */
module.exports.renderMealsEdit = function(req, res, next) {
  var id        = req.params.id; 
  var meal_id:  = req.params.id; 

  Meal.findById({_id:id}, function(error, meal) {
    console.log('meal', meal); 
    if(error) res.send(error); 
      res.render(
        './meals/edit', {
          meal: meal, 
          user: req.user
      });
  })
};

/* updates a meal */
module.exports.renderMealsUpdate = function(req, res, next) {
  var id = req.params.id; 

  Meal.findById({_id:id}, function(error, meal) {
    if (error) res.send(error); 
      if (req.body.meal_name)     meal.meal_name      = req.body.meal_name; 
      if (req.body.drink_name)    meal.drink_name     = req.body.drink_name;
      if (req.body.meal_cals)     meal.meal_cals      = req.body.meal_cals;
      if (req.body.drink_cals)    meal.drink_cals     = req.body.drink_cals;
      if (req.body.meal_protein)  meal.meal_protein   = req.body.meal_protein; 
      if (req.body.drink_protein) meal.drink_protein  = req.body.drink_protein; 
      if (req.body.snack_name)    meal.snack_name     = req.body.snack_name; 
      if (req.body.snack_cals)    meal.snack_cals     = req.body.snack_cals; 
      if (req.body.snack_protein) meal.snack_protein  = req.body.snack_protein; 
  
      meal.save(function(error) {
        if (error) res.send(error); 
          res.redirect('/meals/' + id); 
      });
  });
};

/* renders to meal show page */
module.exports.renderMealsShow = function(req, res, next) {
  var id = req.params.id; 

  Meal.findById(_id: id}, function (error, meal) {
    if (error) res.send(error); 
      res.render(
        './meals/show', {
          meal: meal, 
          user: req.user
        });
  });
};

module.exports.deleteMeal = function(req, res) {
  var id      = req.params.id; 
  var meal_id = req.params.id; 

  Meal.findByIdAndRemove({_id:id}, function (error) {
    if (error) res.send(error); 
      res.redirect('/meals')
  }); 
};


