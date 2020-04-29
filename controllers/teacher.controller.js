var passport=require('passport')
var mongoose=require('mongoose');
var services=require('../services/teacher')
const flash = require('connect-flash');


module.exports.getLogin = function (req, res) {

 if(req.isAuthenticated('local-teacherLogin')&&req.user.LoaiTaiKhoan=="Giao Vien"){
  return res.render('./teacher_views/teacher');
 }
 if(req.isAuthenticated('local-teacherLogin')&&req.user.LoaiTaiKhoan=="Sinh Vien"){
  return res.render('./student_views/student');
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
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
}
  

//Check auth
module.exports.isNotLogined_next = async function (req, res, next) {
  if (!req.isAuthenticated('local-teacherLogin')) return next();
  if(req.isAuthenticated('local-teacherLogin')) return next();
}