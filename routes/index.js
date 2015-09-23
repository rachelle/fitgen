var express        = require('express');
var router         = express.Router();
var passport       = require('passport'); 
var methodOverride = require('method-override');

var User = require('../models/User');

var SessionsController = require('../controllers/Sessions');
var UsersController    = require('../controllers/Users');

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

/* renders sessions controller */
router.get('/login',  SessionsController.sessionsNew);
router.post('/login', passport.authenticate(
    'local', 
   { 
    failuresRedirect: '/login' 
   }),                SessionsController.sessionsCreate);
router.get('/logout', SessionsController.sessionsDelete);

/* users controller */
router.get('/auth/register',              UsersController.usersNew);
router.post('/auth/register',             UsersController.usersCreate);
router.get('/users',          isLoggedIn, UsersController.usersIndex);
router.get('/users/:id',      isLoggedIn, UsersController.userShow);
router.get('/users/:id/edit', isLoggedIn, UsersController.userEdit);
router.put('/users/:id',      isLoggedIn, UsersController.userUpdate);
router.delete('/users/:id',   isLoggedIn, UsersController.userDelete);

module.exports = router;
