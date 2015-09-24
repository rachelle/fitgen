var express = require('express'); 
var mongoose = require('mongoose'); 

/* source in required models */
var Meal = require('../models/Meal'); 
var User = require('../models/User'); 

var router = express.Router();

/* gets all users meals */
module.exports.renderMealsIndex = function(req, res, next){
  Photo.find(function(err, meals){
    if (err) res.send('> ' + err);
      res.render('./meals', 
      {
        meals: meals, 
        user: req.user
      });
  });
};

/* renders a new user meal */
module.exports.renderMealsNew = function(req, res){
  var meals = Meal.all 
    res.render('./meals/new', {user: req.user, meals:meals});
};

module.exports.renderMealsCreate = function(req, res, next){
  var meal = new Meal({
    meal_name:      req.body.meal_name,
    meal_protein:   req.body.meal_protien, 
    meal_cals:      req.body.meal_cals, 
    drink_name:     req.body.drink_name, 
    drink_cals:     req.body.drink_cals, 
    drink_protein:  req.body.drink_protein, 
    snack_name:     req.body.snack_name, 
    snack_cals:     req.body.snack_cals, 
    snack_protein:  req.body.snack_protein, 
    user_id:       req.user.id
  });   
  console.log(req.body); 
  meal.save(function(error){
    if(error){res.send('> ', + error);}
     
      res.redirect("/meals/" + meal.id);
  });
};

/* edit photo */
module.exports.renderMealsEdit = function(req, res, next){
  var id = req.params.id; 
  var meal_id = req.params.id; 

  Meal.findById({_id:id}, function(error, meal){
    console.log('meal', meal); 
    if(error) res.send(error); 
      res.render(
       './meals/edit', {
          meal: meal, 
          user: req.user
      });
  })
};


module.exports.renderMealsUpdate = function(req, res, next){
  var id = req.params.id; 

  Meal.findById({_id:id}, function(error, meal){
    if(error) res.send(error); 
      if (req.body.meal_name)     meal.meal_name      = req.body.meal_name;
      if (req.body.meal_cals)     meal.meal_cals      = req.body.meal_cals; 
      if (req.body.meal_protein)  meal.meal_protein   = req.body.meal_protein; 
      if (req.body.drink_name)    meal.drink_name     = req.body.drink_name;
      if (req.body.drink_cals)    meal.drink_cals     = req.body.drink_cals; 
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

module.exports.renderMealsShow = function(req, res, next) {
  var id = req.params.id; 

  Meal.findById({_id: id}, function (error, meal){
    console.log('meal', meal);
    if(error) res.send(error); 
      res.render(
      './meals/show', {
        meal: meal, 
        user: req.user
      });
  }); 
};

module.exports.deleteMeal = function(req, res){
  var id = req.params.id; 
  var meal_id = req.params.id; 

  Meal.findByIdAndRemove({_id:id}, function (error){
    if (error) res.send(error);
      res.redirect('/meals')
  }); 
};
