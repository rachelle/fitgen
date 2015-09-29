var express   = require('express'); 
var mongoose  = require('mongoose'); 

/* source in required models */
var Comment = require('../models/Comment'); 
var Photo   = require('../models/Photo'); 
var User    = require('../models/User');

var router = express.Router(); 



module.exports.renderCommentsIndex = function ( req, res ){
  Comment.find( function ( err, comments, count ){
    res.render( 'index', {
        title : 'Comment System with Mongoose and Node',
        comments : comments
    });
  });
}; 

module.exports.renderCommentsCreate = function ( req, res ){
  new Comment({
    username : req.body.username,
    content : req.body.comment,
    created : Date.now()
  }).save( function( err, comment, count ){
    res.redirect( '/' );
  });
};