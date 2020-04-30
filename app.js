const express = require('express');
var createError = require('http-errors');
const path = require('path');
const {google} = require('googleapis');
const keys=require('./keys.json');
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
// var account=require('./models/model_account');
// var object={
//   IDTaiKhoan:"1000GV",
//   PassWord:"nguyenducde",
//   LoaiTaiKhoan:"Giao Vien"
// }
// account.insertMany(object,(err,done)=>{
//   console.log(done);
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
  cookie: { maxAge: 1000*60 },
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

app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Set Google Sheet
/*
const client=new google.auth.JWT(
keys.client_email,null,keys.private_key,['https://www.googleapis.com/auth/spreadsheets']
);

  client.authorize(function(err,tokens){
        if(err)
        {
            console.log(err);
            return;
        }
        else{
           console.log("Kết nối GoogleSheets thành công");
           gsrun(client);
        }
    })


async function gsrun(cl)
{
    const gsapi=google.sheets({version:'v4',auth:cl});
   const opt={
       //id gg sheets
       spreadsheetId:'1dmvytgNyj8KVAn81mf_Kep0hDwJbsxGkrcEBFqmxz74',
       range:'B2:C10'
   };
  let data= await gsapi.spreadsheets.values.get (opt);

  //console.log(data.data.values);
}

*/
//Use router
app.use(indexRouter);
app.use(teacherRouter);
app.use(studentRouter);
app.get('/qr',(req,res)=>{
  res.render('./student_views/qr');
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