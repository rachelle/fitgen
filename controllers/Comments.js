var express   = require('express'); 
var mongoose  = require('mongoose'); 

/* source in required models */
var Comment = require('../models/Comment'); 
var Photo   = require('../models/Photo'); 
var User    = require('../models/User');

var router = express.Router(); 


module.exports.renderCommentsCreate = function (req, res, next) { 
  Photo.findOne({_id: request.params.photo_id}, function(error, photo) {
    if(error) return response.send(error); 
    photo.comments.push({
      content: request.body.content, 
      user:    request.body.user
    });
    photo.save(function(error) {
      if(error) return response.send(error); 
      response.send({
      success: true
      });
    }); 
  }); 
};


module.exports.renderCommentsShow = function (req, res, next) {
  Photo.findOne({_id: request.params.photo_id}, function(error, photo) {
    if (error) return response.send(error); 
    response.send(photo.comments); 
  });
};