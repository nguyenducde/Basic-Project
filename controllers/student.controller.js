var passport=require('passport')
const httpMsgs=require("http-msgs");
var students=require('../models/model_student');
var event=require('../models/module_event');
var serviceNoti=require('../services/activity');



module.exports.getLogin = function (req, res) {
 if(req.isAuthenticated('local-studentLogin')&&req.user.LoaiTaiKhoan=="Sinh Vien"){
  return  students.findOne({MSSV:req.user.IDTaiKhoan},(err,result)=>{
     if(result){
    return   res.render('./student_views/student',{profile:result});
  }  
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
module.exports.isLogined_next = async function (req, res, next) {
  if (req.isAuthenticated('local-teacherLogin')) return next();
  return res.redirect('/');
}

//Get infomation student by MSSV,DateTime
module.exports.getActStudent = async function (req, res, next) {
  var time=new Date();
  var check=false;
  let act_Student=await serviceNoti.GetActStudent(req.user.IDTaiKhoan)
  act_Student.forEach(Element=>{
   if(Element.ThoiGian.getTime()>time.getTime()){
    check=true;
    return   res.render('./student_views/student_diemdanh',{check});
   }
  })
}
//Save DiemDanh in databases
module.exports.saveDiemDanh=async function (req, res){
  var code=req.query.code;
  let getNoti=await serviceActivity.findNoti(code);
  //Check student đã điểm danh hay chưa
  let checkDiemDanh=await serviceActivity.checkDone(code,getNoti.MSSV,getNoti.TenSuKien,getNoti.ThoiGian);
  if(checkDiemDanh.length>0){

    //Not save database
  }
  else{
    //save database
  }
}