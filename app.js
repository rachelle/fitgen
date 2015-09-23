var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/* require modules for mongoose and passport */
var mongoose = require('mongoose');
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy; 
var routes = require('./routes/index');

var methodOverride = require('method-override');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//||||||||||||||||||||||||||--
// CREATE MONGO DB
//||||||||||||||||||||||||||--
var mongoURI = 'mongodb://localhost/fitgen';
if (process.env.NODE_ENV === 'production') {
  mongoURI = process.env.MONGOLAB_URI
};

//||||||||||||||||||||||||||--
// CONNECT TO OUR MONGO DATABASE
//||||||||||||||||||||||||||--
mongoose.connect(mongoURI);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3000);

app.use(require('express-session')({
    secret: 'aesthetic only',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

var User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.locals.title = 'fitgen';



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
