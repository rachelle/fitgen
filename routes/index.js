var express        = require('express');
var router         = express.Router();

/* passport middleware will add authenticated users */
var passport       = require('passport'); 
var methodOverride = require('method-override');

/* Required modules */
var User = require('../models/User');

/* Required controllers */
var SessionsController = require('../controllers/Sessions');
var UsersController    = require('../controllers/Users');
var PhotosController   = require('../controllers/Photos');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
});


/* checks if the user is logged in */
var isLoggedIn = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login'); 
  }
    return next();
};

/* renders sessions controllers */
router.get('/login',    SessionsController.sessionsNew);
router.post('/login',   passport.authenticate(
    'local',
    {
      failureRedirect: '/login'
    }),                SessionsController.sessionsCreate);
router.get('/logout',  SessionsController.sessionsDelete);


/* renders photos controller */
router.get('/photos',            isLoggedIn, PhotosController.renderPhotosIndex);
router.get('/photos/new',       isLoggedIn, PhotosController.renderPhotosNew); 
router.post('/photos',            isLoggedIn, PhotosController.renderPhotosCreate);
router.get('./photos/:id/edit',  isLoggedIn, PhotosController.renderPhotosEdit);
router.put('/photos/:id',        isLoggedIn, PhotosController.renderPhotosUpdate); 
router.get('/photos/:id',        isLoggedIn, PhotosController.renderPhotosShow); 
router.delete('/photos/:id',     isLoggedIn, PhotosController.deletePhoto);

/* renders users controller */
router.get('/auth/register',              UsersController.usersNew);
router.post('/auth/register',             UsersController.usersCreate);
router.get('/users',          isLoggedIn, UsersController.usersIndex);
router.get('/users/:id',      isLoggedIn, UsersController.userShow);
router.get('/users/:id/edit', isLoggedIn, UsersController.userEdit);
router.put('/users/:id',      isLoggedIn, UsersController.userUpdate);
router.delete('/users/:id',   isLoggedIn, UsersController.userDelete);


module.exports = router;
