const express = require('express');
var app=express();
var createError = require('http-errors');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
var logger = require('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const device = require('express-device');


//routers
var studentRouter=require('./routers/student.router');
var teacherRouter=require('./routers/teacher.router');
var indexRouter=require('./routers/index.router');


//module security
var helmet = require('helmet');
const csp = require('helmet-csp');
const crypto = require('crypto');
const hidePoweredBy = require('hide-powered-by');
const hsts = require('hsts');
const ienoopen = require('ienoopen');
const nocache = require('nocache');
const dontSniffMimetype = require('dont-sniff-mimetype');
const frameguard = require('frameguard');
const xssFilter = require('x-xss-protection');

//middleware security
app.use(helmet());

//middleware cross-site injection
// app.use(csp({
//   // Specify directives as normal.
//   directives: {
//     defaultSrc: ["'self'", 'default.com'],
//     scriptSrc: ["'self'", "'unsafe-inline'"],
//     styleSrc: ['style.com'],
//     fontSrc: ["'self'", 'fonts.com'],
//     imgSrc: ['img.com', 'data:'],
//     sandbox: ['allow-forms', 'allow-scripts'],
//     reportUri: '/report-violation',
//     objectSrc: ["'none'"],
//     upgradeInsecureRequests: true,
//     workerSrc: false  // This is not set.
//   },

//   // This module will detect common mistakes in your directives and throw errors
//   // if it finds any. To disable this, enable "loose mode".
//   loose: false,

//   // Set to true if you only want browsers to report errors, not block them.
//   // You may also set this to a function(req, res) in order to decide dynamically
//   // whether to use reportOnly mode, e.g., to allow for a dynamic kill switch.
//   reportOnly: false,

//   // Set to true if you want to blindly set all headers: Content-Security-Policy,
//   // X-WebKit-CSP, and X-Content-Security-Policy.
//   setAllHeaders: false,

//   // Set to true if you want to disable CSP on Android where it can be buggy.
//   disableAndroid: false,

//   // Set to false if you want to completely disable any user-agent sniffing.
//   // This may make the headers less compatible but it will be much faster.
//   // This defaults to `true`.
//   browserSniff: true
// }))
// app.post(
//   '/report-violation',
//   bodyParser.json({
//     type: ['json', 'application/csp-report']
//   }),
//   (req, res) => {
//     if (req.body) {
//       console.log('csp violation: ', req.body)
//     } else {
//       console.log('csp violation: no data received!')
//     }
//     res.status(204).end()
//   }
// )
//removes the X-Powered-By header
app.use(hidePoweredBy());
app.disable('x-powered-by');

//header that enforces secure (HTTP over SSL/TLS) connections to the server
app.use(hsts({
  maxAge: 15552000,
  includeSubDomains: false
}))
const hstsMiddleware = hsts({
  maxAge: 1234000
})

app.use((req, res, next) => {
  if (req.secure) {
    hstsMiddleware(req, res, next)
  } else {
    next()
  }
})

//Internet Explorer, restrict untrusted HTML
app.use(ienoopen());

//sets Cache-Control and Pragma headers to disable client-side caching.
app.use(nocache());

// to prevent browsers from MIME-sniffing a response away from the declared content-type.
app.use(dontSniffMimetype());

//sets the X-Frame-Options header to provide clickjacking protection.
    // Don't allow me to be in ANY frames:
app.use(frameguard({ action: 'deny' }));

//sets X-XSS-Protection to enable the Cross-site scripting (XSS) filter in most recent web browsers
app.use(xssFilter({ mode: null }));



/*=============================End middleware Sercurity========================== */
/*=================================================================== */

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
