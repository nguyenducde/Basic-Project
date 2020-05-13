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
// var students=require('./models/model_student');
// var accounts=require('./models/model_account');
var evetnobject={
  IDSuKien:"TCC",
  TenSuKien:"Toán cao cấp",
MSSV:"1710144",
MSGV:"GVTCC"
}
event.find({TenSuKien:"Toán cao cấp"},(err,re)=>{
  re.forEach(Element=>{
    console.log(Element.MSSV)
  })
})
// var object={
//   IDTaiKhoan:"GV1999",
//   PassWord:"nguyenducde",
//   LoaiTaiKhoan:"Giao Vien"
// }
// event.insertMany(evetnobject,(err,done)=>{
//   if(done){
//     console.log(done);

//   }
//   else{
//     console.log(err);
//   }
// });

var app=express();

//Set Template Engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
///
//
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//
//Set Passport
app.use(session({
  secret: "mysecret",
  cookie: { maxAge: 1000*60*5000 },
        //Save session to database 
  // store: new (require('express-sessions'))({
  //     storage: 'mongodb',
  //     instance: mongoose, // optional
  //     host: 'localhost', // optional
  //     port: 27017, // optional
  //     db: 'DiemDanhDB', // optional
  //     collection: 'sessions', // optional
  //     expire: 86400 // optional
  // }),
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
