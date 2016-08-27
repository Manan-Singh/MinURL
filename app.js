var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var xssFilters = require('xss-filters');

// setup the db
var mongodb = require('mongodb');
var mongoose = require('mongoose');

// get the configuration settings
var config = require('./config');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// get the Url and UrlNum models for storing in db
var Url = require('./models/Url');
var UrlNum = require('./models/UrlNum');

// the global varibale that keeps track of the url count
var urlCount = -1;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// provide a custom sanitizer for preventing xxs attacks
app.use(expressValidator({
    customSanitizers: {
        sanitizeURL: function(value){
            var safeURL = xssFilters.uriInUnQuotedAttr(value);
            return safeURL;
        }
    }
}));

// connect the db
mongoose.connect(config.MONGO_CONNECTION);
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function(){
    console.log('Connected to the database!');
    // Check if there is a doc for UrlNumSchema (the doc contains a global int var that the urls will use
    UrlNum.find({}, function(err, urlNums){
        if(urlNums.length ===  0){
            // No UrlNum exists, so create one
            var newNum = new UrlNum();
            newNum.save();
        }

        // attach an object to the req which will have this global
        urlCount = urlNums[0];
    });
});

// attach urlCount to the req object
app.use(function(req, res, next){
    req.urlCount = urlCount;
    next();
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
