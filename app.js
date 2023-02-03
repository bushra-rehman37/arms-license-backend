var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var armsRouter = require('./routes/arms');
const { getDb, connectToDb } = require('./db/db')

let db

connectToDb((err) => {
  if(!err){
    // app.listen('3000', () => {
      console.log('app listening on port 3000')
    // })
    db = getDb()
  }
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// mongoose.connect("mongodb+srv://armslicence:armslicence@cluster0.am1blxx.mongodb.net/test", { useNewUrlParser: true }, function (err) {
//   if (err) {
//     console.log('Error In Mongo Connection')
//     console.log(err)
//   }
//   else {
//     console.log("Connection with MongoDB successfull")
//   }
// })
// app.use('/', indexRouter);
app.use('/arms', armsRouter);

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
