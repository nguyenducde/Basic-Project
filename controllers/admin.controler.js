const passport = require('passport');
var admin=require('../models/model_admin');
var serviceActivity=require('../services/activity.js');
var account=require('../models/model_account');
//Check auth

module.exports.isNotLogined_next = async function (req, res, next) {
    if (!req.isAuthenticated('local-adminLogin')) return next();
    if(req.isAuthenticated('local-adminLogin')) return next();
   
  }
  
  module.exports.isLogined_next = async function (req, res, next) {
    if (req.isAuthenticated('local-adminLogin')) return next();
    return res.redirect('/admin');
  }
module.exports.getLogin= async function (req, res, next) {
    mess="";
   return res.render('./admin_views/login',mess);
}
module.exports.getHome= async function (req, res, next) {
    Mess="";
    let PeopleAcocount= await serviceActivity.findAllAccount();
    let ListEvent=await serviceActivity.findNameEventDuplate(req.user.IDTaiKhoan);
    let activities = await serviceActivity.getAllMyActivities(req.user.IDTaiKhoan);
    let listJoin=await serviceActivity.getListJoin(req.user.IDTaiKhoan);
   let listDiemDanh=await serviceActivity.getDiemDanh();
   let infoEvent=await serviceActivity.getListInfo(req.user.IDTaiKhoan);
    admin.findOne({IDMaAdmin:req.user.IDTaiKhoan},(err,result)=>{
      console.log(result);
      return res.render('./admin_views/home',{
        mess:Mess,
        Profile:result,
        PeopleAc:PeopleAcocount,
        ListEventUyQuyen:ListEvent,
        act: activities,
        listStudent:listJoin,
        listStudentDiemDanh:listDiemDanh,
        listInfoEvent:infoEvent
       });
    })
   
}
module.exports.postLoginAdmin = passport.authenticate('local-adminLogin', {
    successRedirect : '/admin-home',
    failureRedirect : '/admin',
    failureFlash : true
  });

module.exports.logOut=async function(req,res){
  req.session.destroy(function (err) {
  return   res.redirect('/admin'); //Inside a callback… bulletproof!
  });
}
module.exports.AJAX_xacNhanUyQuyen=async function (req, res, next) {
  var IdUser=req.query.c;
  var AdminUser=req.body.IDUserAdmin;
  var TenChucNang=req.body.tensukien;
  account.findOneAndUpdate({IDTaiKhoan:IdUser},{VaiTro:"1",ChucNang:TenChucNang,NguoiUyQuyen:AdminUser.slice(1)},(err,result)=>{
    console.log(result);
  })
  return  res.end();
}
module.exports.AJAX_HuyxacNhanUyQuyen=function (req, res) {
  account.findOneAndUpdate({IDTaiKhoan:req.query.c},{VaiTro:"0",ChucNang:"",NguoiUyQuyen:""},(err,result)=>{
    console.log(result);
  })
  return  res.send("");
}


function randomNum(num) {
  var result           = '';
  var characters       = '0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < num; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function add0(n) {return (n<=9)?'0'+n:n;}
function removeCharInStr(c,s){
  var o='';
  for(var i=0;i<s.length;i++)
  o+=(s[i]!=c)?s[i]:'';
}