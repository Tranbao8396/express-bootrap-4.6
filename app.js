var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const hbs = require('hbs');

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/express=bootstrap';
mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log(`Database connection in ${DATABASE_URL}`);
});

var appRouter = require('./routes');

var app = express();

app.use(session({
  secret: 'adsa897adsa98bs',
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/shared', function (err) { });
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(appRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
