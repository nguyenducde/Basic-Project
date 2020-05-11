var passport=require('passport')
const flash = require('connect-flash');
var serviceNoti=require('../services/noti.js');
var noti=require('../models/model_noti');
var event=require('../models/module_event');
var infoAc=require('../models/model_infoActivity')
module.exports.getLogin = function (req, res) {

 if(req.isAuthenticated('local-teacherLogin')&&req.user.LoaiTaiKhoan=="Giao Vien"){
  return res.render('./teacher_views/teacher');
 }
 if(req.isAuthenticated('local-studentLogin')&&req.user.LoaiTaiKhoan=="Sinh Vien"){
  return res.redirect('/student');
 }
 else{
  req.flash('error', 'Vui lòng đăng nhập lại');
 return   res.redirect('/');
 }
}
module.exports.postLogin = passport.authenticate('local-teacherLogin', {
    successRedirect : '/teacher_tructiep',
    failureRedirect : '/',
    failureFlash : true
  });

module.exports.logOut=async function(req,res){
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
}
  

//Check auth
module.exports.isNotLogin_next = async function (req, res, next) {
  if (!req.isAuthenticated('local-teacherLogin')) return next();
  if(req.isAuthenticated('local-teacherLogin')) return next();
}
module.exports.isLogined_next = async function (req, res, next) {
  if (req.isAuthenticated('local-teacherLogin')) return next();
  return res.redirect('/');
}
//Work noti
module.exports.postCreateActivity = async function(req, res) {
 let name=req.body.name;
 let datetime=req.body.code;
let checkNameEvent=serviceNoti.findNameEvent(name);
if(checkNameEvent==undefined)
{
  req.flash("Tên sự kiện không phù hợp")
  res.redirect('/teacher_tructiep');
}
else{
  infoAc.insertMany({
    TenSuKien:name,
    ThoiGian:datetime,
    MSGV:req.user.IDTaiKhoan})
  // console.log(re[i].MSSV);
  
  // noti.insertMany(info);
  event.find({TenSuKien:name},(err,result)=>{
    result.forEach(element=>{
      let info = {
        TenSuKien:name,
        ThoiGian:datetime,
        MSGV:req.user.IDTaiKhoan,
        MSSV:element.MSSV
      };
      noti.insertMany(info);
    })
  })
}
  res.redirect('/teacher_tructiep');
}
module.exports.getHome = async function (req, res) {

  let activities = await serviceNoti.getAllMyActivities(req.user.IDTaiKhoan);
  
  res.render('./teacher_views/teacher_tructiep', {
    user: req.user,
    act: activities,
    mess: req.flash('mess'),
    
   // actRD: activitiesReady
  });
}

