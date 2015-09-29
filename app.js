require('dotenv').load();
var config = require('config');
var http = require('http');
var socketio = require('socket.io');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoStore = require('connect-mongo')(session);
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy; 
var routes = require('./routes/index');

var app = express();
<<<<<<< HEAD
=======
var io = require('socket.io')();

require('./config')(app, io); 
require('./routes')(app, io); 
>>>>>>> de68a5b059bca0c2f0b291f04503e2bef9d38f89

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('./public')); 

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(methodOverride('_method'));


app.use(express.static(path.join(__dirname, 'public')));
app.listen(process.env.PORT || 3000);

/* source in models */
var User      = require('./models/User');
var Photo     = require('./models/Photo');
var Exercise  = require('./models/Exercise');
var Meal      = require('./models/Meal');
var Task      = require('./models/Task');
var Comment   = require('./models/Comment');

//||||||||||||||||||||||||||--
// CREATE MONGO DB
//||||||||||||||||||||||||||--
var mongoURI = 'mongodb://localhost/fitgen';
if (process.env.NODE_ENV === 'production') {
  mongoURI = process.env.MONGOLAB_URI
};

// CONNECT to our mongo database
mongoose.connect('mongodb://localhost:27017/fitgen');

/* connecting tasks controller */
app.param('task_id', function(req, res, next, taskId) {
  req.db.tasks.findById(taskId, function(error, task) {
    if (error) return next(error); 
    if (!task) return next(new Error('Task is not found.')); 
    req.task = task; 
    return next(); 
  });
});

/* authorized middleware */
app.use(require('express-session')({
    secret: 'aesthetic only',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.locals.title = 'fitgen';

app.use('/', routes);

var User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* start the server */
app.listen();
console.log('3000 is the magic port');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
