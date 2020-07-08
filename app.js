const express = require('express');
var createError = require('http-errors');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
var logger = require('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const flash = require('connect-flash');
var studentRouter=require('./routers/student.router');
var teacherRouter=require('./routers/teacher.router');
var indexRouter=require('./routers/index.router');
var event=require('./models/module_event');
const device = require('express-device')




var app=express();

//Set Template Engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
///
//
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(device.capture());
//
//Set Passport
app.use(session({
  secret: "mysecret",
  cookie: { maxAge: 1000*60*5000 },
  resave: true,
  saveUninitialized: true,
  unset: 'destroy',
}));

//Use authencation
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Use router
app.use(indexRouter);
app.use(teacherRouter);
app.use(studentRouter);
app.get('/qr',(req,res)=>{
 return  res.render('./student_views/qr');
})

//Get passport
require('./configs/passport')(passport);
///Connect Database
var configDB = require('./configs/database');

var connectOptions=
{  useFindAndModify:false,
   useUnifiedTopology: true,
   useNewUrlParser: true,
   useCreateIndex: true
}
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url, connectOptions)
  .then(
  () => { 
    console.log('Connected to database');
  },
  err => { 
    console.log('Can\'t connect to database: '+err);
  }
);

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

module.exports=app;
