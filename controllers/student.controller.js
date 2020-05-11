var passport=require('passport')
const httpMsgs=require("http-msgs");
var students=require('../models/model_student');
var event=require('../models/module_event');




module.exports.getLogin = function (req, res) {
 if(req.isAuthenticated('local-studentLogin')&&req.user.LoaiTaiKhoan=="Sinh Vien"){
  return  students.findOne({MSSV:req.user.IDTaiKhoan},(err,result)=>{
     if(result){
    return   res.render('./student_views/student',{profile:result});}  
 });
 }
 if(req.isAuthenticated('local-teacherLogin')&&req.user.LoaiTaiKhoan=="Giao Vien"){
  return res.redirect('/teacher')
 }
 else{
  req.flash('error', 'Vui lòng đăng nhập lại');
  return  res.redirect('/');
 }
}
module.exports.postLogin = passport.authenticate('local-studentLogin', {
    successRedirect : '/student',
    failureRedirect : '/',
    failureFlash : true
  });

module.exports.logOut=async function(req,res){
  req.session.destroy(function (err) {
  return   res.redirect('/'); //Inside a callback… bulletproof!
  });
}
  

//Check auth
module.exports.isNotLogined_next = async function (req, res, next) {

  if (!req.isAuthenticated('local-studentLogin')) return next();
  if(req.isAuthenticated('local-studentLogin')) return next();
 
}

//work noti
