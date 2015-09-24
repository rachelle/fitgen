var express  = require('express');
var mongoose = require('mongoose');


/* source in models */
var Exercise = require('../models/Exercise'); 
var User     = require('../models/User'); 

var router   = express.Router(); 

/* gets all exercises */
module.exports.renderExercisesIndex = function(req, res, next){
  Exercise.find(function (err, exercises){
    if (err) res.send('> ' + err); 
      res.render('./exercises',
      {
        exercises: exercises, 
        user: req.user
      }); 
  }); 
};

/* renders a new exercise plan */
module.exports.renderExercisesNew = function(req, res){
  var exercises = Exercise.all
    res.render('./exercises/new', {user: req.user, exercises:exercises});
};

/* creates a workout plan */
module.exports.renderExercisesCreate = function(req, res, next){
  var exercise = new Exercise({
    description: req.body.description,
    name: req.body.name,
    date: req.body.date, 
    reps: req.body.reps, 
    sets: req.body.sets, 
    user: req.user
  }); 
  console.log(req.body); 
  exercise.save(function(error){
    if(error){res.send('> ' + err);}
      req.user.exercises.push(exercise); 
      req.user.save(); 
      res.redirect("./exercises/" + exercise.id);
  }); 
}; 

/* users can edit their exercise routine */
module.exports.renderExercisesEdit = function(req, res, next) {
  var id = req.params.id; 
  var exercise_id = req.params.id; 

  Exercise.findById({_id:id}, function(error, exercise){
    console.log('exercise', exercise); 
    if(error) res.send(error)
      res.render(
      './exercises/edit', {
          exercise: exercise, 
          user: req.user
      });
    })
};

/* user can update their exercise routine */
module.exports.renderExercisesUpdate = function(req, res, next){
  var id = req.params.id; 

  Exercise.findById({_id:id}, function(error, exercise){
    if(error) res.send(error);
    if (req.body.description) exercise.description = req.body.description;
    if (req.body.name) exercise.name = req.body.name; 
    if (req.body.sets) exercise.sets = req.body.sets; 
    if (req.body.reps) exercise.reps = req.body.reps; 
    if (req.body.date) exercise.date = req.body.date; 
      exercise.save(function(error) {
        if (error) res.send(error); 
          res.redirect('/exercises/' + id); 
      });
  });
};

/* exercise can be viewed on the show page */
module.exports.renderExercisesShow = function(req, res, next) {
  var id = req.params.id; 

  Exercise.findById({_id:id}, function (error, exercise) {
    if (error) res.send(error); 
      res.render(
      './exercises/show', {
        exercise: exercise, 
        user: req.user
      });
  });
};

/* deletes the exercise plan you have created from the search box */
module.exports.deleteExercise = function(req, res){
  var id = req.params.id; 
  var exercise_id = req.params.id; 

  Exercise.findByIdAndRemove({_id:id}, function (error){
    if (error) res.send(error);
      res.redirect('/exercises')
    }); 
 };