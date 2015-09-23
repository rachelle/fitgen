var express = require('express'); 
var router  = express.Router(); 

/* Require Passport */
var passport        = require('passport'); 
var methodOverride  = require('method-override');

/* Require Model */
var User = require('../models/User');

/* renders a new user */
function userNew(req, res) {
  res.render('auth/register'); 
}; 

/* renders all users */
var usersIndex = function(req, res, next) {
  User.find(function(err, users) {
    if (err) res.json({ message: 'Could not find user'});
       res.render('./users', {
          title: "Here all the users", 
          users:  users, 
           user:  req.user
       });
  });
};

/* creates new user */
function usersCreate(req, res) {
  User.register(new User({
    username: req.body.username, 
    name:     req.body.name, 
    height:   req.body.height, 
    status:   req.body.status, 
    image:    req.body.image, 
    avatar:   req.body.avatar, 
    weight:   req.body.weight
    url:      req.body.url, 
  }), req.body.password, function(err, user) {
    /* if (err) { console.log(err); return res.render('auth/register') */
    if (err) return res.render('auth/register', {user: user});
      passport.authenticate('local')(req, res, function() {
      req.session.save(function(err) {
        if (err) {
          return next(err);
        }
        res.redirect('/users/' + req.user.id);
      }); 
    }); 
  }); 
}; 


  }))
}