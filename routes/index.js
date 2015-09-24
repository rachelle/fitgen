var express        = require('express');
var router         = express.Router();

/* passport middleware will add authenticated users */
var passport       = require('passport'); 
var methodOverride = require('method-override');

/* Required modules */
var User = require('../models/User');

/* Required controllers */
var SessionsController     = require('../controllers/Sessions');
var UsersController        = require('../controllers/Users');
var PhotosController       = require('../controllers/Photos');
var ExercisesController    = require('../controllers/Exercises');
var MealsController        = require('../controllers/Meals');

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

/* renders meals controller */
router.get('/meals',          isLoggedIn, MealsController.renderMealsIndex);
router.get('/meals/new',      isLoggedIn, MealsController.renderMealsNew);
router.post('/meals',         isLoggedIn, MealsController.renderMealsCreate); 
router.get('/meals/:id/edit', isLoggedIn, MealsController.renderMealsEdit);
router.put('/meals/:id',      isLoggedIn, MealsController.renderMealsUpdate); 
router.get('/meals/:id',      isLoggedIn, MealsController.renderMealsShow);
router.delete('/meals/:id',   isLoggedIn, MealsController.deleteMeal);

/* renders exercise controller */
router.get('/exercises',          isLoggedIn, ExercisesController.renderExercisesIndex);
router.get('/exercises/new',      isLoggedIn, ExercisesController.renderExercisesNew);
router.post('/exercises',         isLoggedIn, ExercisesController.renderExercisesCreate); 
router.get('/exercises/:id/edit', isLoggedIn, ExercisesController.renderExercisesEdit);
router.put('/exercises/:id',      isLoggedIn, ExercisesController.renderExercisesUpdate); 
router.get('/exercises/:id',      isLoggedIn, ExercisesController.renderExercisesShow);
router.delete('/exercises/:id',   isLoggedIn, ExercisesController.deleteExercise);

/* renders photos controller */
router.get('/photos',            isLoggedIn, PhotosController.renderPhotosIndex);
router.get('/photos/new',        isLoggedIn, PhotosController.renderPhotosNew); 
router.post('/photos',           isLoggedIn, PhotosController.renderPhotosCreate);
router.get('/photos/:id/edit',   isLoggedIn, PhotosController.renderPhotosEdit);
router.put('/photos/:id',        isLoggedIn, PhotosController.renderPhotosUpdate); 
router.get('/photos/:id',        isLoggedIn, PhotosController.renderPhotosShow); 
router.delete('/photos/:id',     isLoggedIn, PhotosController.deletePhoto);

/* renders user controller */
router.get('/auth/register',              UsersController.usersNew);
router.post('/auth/register',             UsersController.usersCreate);
router.get('/users',          isLoggedIn, UsersController.usersIndex);
router.get('/users/:id',      isLoggedIn, UsersController.userShow);
router.get('/users/:id/edit', isLoggedIn, UsersController.userEdit);
router.put('/users/:id',      isLoggedIn, UsersController.userUpdate);
router.delete('/users/:id',   isLoggedIn, UsersController.userDelete);


module.exports = router;
