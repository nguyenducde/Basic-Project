var passport=require('passport')
var mongoose=require('mongoose');
var servicesAccount=require('../services/account')
const flash = require('connect-flash');


module.exports.getLogin = function (req, res) {
 
 if(req.isAuthenticated('local-studentLogin')){
  return res.render('./student_views/student');
 }
 else{
  req.flash('error', 'Vui lòng đăng nhập lại');
   res.redirect('/');
 }
}
module.exports.postLogin = passport.authenticate('local-studentLogin', {
    successRedirect : '/student',
    failureRedirect : '/',
    failureFlash : true
  });

module.exports.logOut=async function(req,res){
  passport.authenticate('local-studentLogin', { session: false }),
 res.redirect('/');
}
  

//Check auth
module.exports.isNotLogined_next = async function (req, res, next) {
  passport.authenticate('local-teacherLogin', { session: false });
  if (!req.isAuthenticated('local-studentLogin')) return next();
  if(req.isAuthenticated('local-studentLogin')) return res.render('./student_views/student');
 
}