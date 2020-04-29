var passport=require('passport')
var mongoose=require('mongoose');
var services=require('../services/teacher')
const flash = require('connect-flash');


module.exports.getLogin = function (req, res) {
 if(req.isAuthenticated('local-teacherLogin')){
  return res.render('./teacher_views/teacher');
 }
 else{
  req.flash('error', 'Vui lòng đăng nhập lại');
   res.redirect('/');
 }
}
module.exports.postLogin = passport.authenticate('local-teacherLogin', {
    successRedirect : '/teacher',
    failureRedirect : '/',
    failureFlash : true
  });

module.exports.logOut=async function(req,res){
  req.session = null ;
  req.session.destroy()
 res.redirect('/');
}
  

//Check auth
module.exports.isNotLogined_next = async function (req, res, next) {
  passport.authenticate('local-studentLogin', { session: false });
  if (!req.isAuthenticated('local-teacherLogin')) return next();
  if(req.isAuthenticated('local-teacherLogin')) return res.render('./teacher_views/teacher');
}