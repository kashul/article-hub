var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();
const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb+srv://root:1234@cluster0-kytg6.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
connection .then((db) => { console.log("Connected correctly to server"); }) .catch((err) => { console.log(err) });
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
var articlesRouter = require('./routes/articles');
app.use('/articles', articlesRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // JSON error
  res.status(err.status || 500);
  res.json({ errors: [{ msg: err.message }] }); // change render to json method
});

module.exports = app;
