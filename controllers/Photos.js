var express   = require('express'); 
var mongoose  = require('mongoose'); 

/* source in required models */
var Photo   = require('../models/Photo'); 
var User    = require('../models/User'); 
var Comment = require('../models/Comment');

/* require express router */
var router = express.Router(); 

/* gets all users photos */
module.exports.renderPhotosIndex = function(req, res, next) {
  Photo.find(function(err, photos) {
    if (err) res.send('> ' + err); 
      res.render('./photos', 
      {
        photos: photos, 
        user  : req.user
      });
  });
};

/* renders a new user photo */
module.exports.renderPhotosNew = function(req, res) {
  var photos = Photo.all
    res.render('./photos/new', {user: req.user, photos:photos}); 
}; 

/* creates a new photo */
module.exports.renderPhotosCreate = function(req, res, next) {
  var photo = new Photo({
    caption: req.body.caption, 
    image  : req.body.image, 
    url    : req.body.url,
    comment: req.body.comment, 
    user_id: req.user.id
  }); 
  console.log(req.body); 
  photo.save(function(error){
    if(error){ res.send('> ' + error);}
      res.redirect('/photos/' + photo.id);
  });
};

/* edit a new photo */
module.exports.renderPhotosEdit = function(req, res, next) {
  var id       = req.params.id; 
  var photo_id = req.params.id;

  Photo.findById({_id:id}, function(error, photo) {
    console.log('photo', photo); 
    if(error) res.send(error); 
      res.render('./photos/edit', {
        photo: photo, 
        user : req.user
      });
  });
};

/* Comment Routes */

/* posting a new comment onto photo */
router.post('/photos/:photo_id/comments', function(req, res, next) {
  Photo.findOne({_id: req.params.photo_id}, function(error, photo) {
    if (error) return res.send(error); 
    photo.comments.push({
      content: req.body.content, 
      user:    req.body.user
    }); 
    photo.save(function(error) {
      if(error) return res.send(error); 
    }); 
  }); 
}); 


/* showing all comments on the photo */
router.get('/photos/:photo_id/comments', function(req, res, next) {
  Photo.findOne({_id: req.params.photo_id}, function(error, photo){ 
    if (error) return res.send(error); 
    res.send(photo.comments); 
  });
});

/* updates a photo */
module.exports.renderPhotosUpdate = function(req, res, next) {
  var id = req.params.id; 

  Photo.findById({_id:id}, function(error, photo){
    if(error) res.send(error); 
      if (req.body.comment) photo.comment = req.body.comment;
      if (req.body.url)     photo.url     = req.body.url; 
      if (req.body.image)   photo.image   = req.body.image; 
      if (req.body.caption) photo.caption = req.body.caption;

      photo.save(function(error) {
        if (error) res.send(error); 
          res.redirect('/photos/' + id); 
      }); 
  });
};

/* renders to photo to show page */
module.exports.renderPhotosShow = function(req, res, next) {
  var id = req.params.id; 

  Photo.findById({_id: id}, function  (error, photo) {
    console.log('photo', photo); 
    if (error) res.send(error); 
      res.render(
        './photos/show', {
          photo: photo, 
          user:  req.user
        });
  });
};

/* users can delete their photo */
module.exports.deletePhoto = function(req, res) {
  var id        = req.params.id; 
  var photo_id  = req.params.id; 

  Photo.findByIdAndRemove({_id:id}, function (error) {
    if (error) res.send(error); 
      res.redirect('/photos')
  });
};
