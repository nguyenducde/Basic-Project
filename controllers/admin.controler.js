const passport = require('passport');
var admin=require('../models/model_admin');
var serviceActivity=require('../services/activity.js');
var noti=require('../models/model_noti');
var event=require('../models/module_event');
var account=require('../models/model_account');

var infoAc=require('../models/model_infoActivity')
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
module.exports.postCreateActivity = async function(req, res) {
  let name=req.body.name;
  let datetime= req.body.time;
  let lop=req.body.lop;
  let hocky=req.body.hocki;
  let pass=req.body.pass;
  let checkNameEvent=serviceActivity.findNameEvent(name);

  let now = new Date();
  let code = add0(now.getDate())+add0(now.getMonth()+1)+''+now.getFullYear()+''+randomNum(4)+''+randomNum(4);
  var check;
  do {
    check = await serviceActivity.isCodeNotExist_code(code,req.user.IDTaiKhoan);
  } while (!check);

  
  if(checkNameEvent==null||datetime==""||lop==""||hocky==""||pass==""||name=="")
  {
    req.flash("Tên sự kiện không phù hợp")
  return res.redirect('/admin-home');
  }
  else{
      infoAc.insertMany({
          IDHoatDong:removeCharInStr('-',check),
          TenSuKien:name,
          Lop:lop,
          HocKy:hocky,
          ThoiGian:datetime,
          MSGV:req.user.IDTaiKhoan,
          MK:pass
      },(err,result)=>{
        console.log(result);
      })
    // console.log(re[i].MSSV);
    
    // noti.insertMany(info);
    event.find({TenSuKien:name,MSGV:req.user.IDTaiKhoan},(err,result)=>{
      result.forEach(element=>{
        //
        let info = {
          IDHoatDong: removeCharInStr('-',check),
          TenSuKien:name,
          Lop:lop,
          HocKy:hocky,
          ThoiGian:datetime,
          MSGV:req.user.IDTaiKhoan,
          MSSV:element.MSSV,
          MK:pass
        };
        noti.insertMany(info);
      })
    })
  }
  return  res.end();
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
 
  account.updateOne({IDTaiKhoan:IdUser},{VaiTro:"1",NguoiUyQuyen:AdminUser.slice(1),ChucNang:TenChucNang},(err,result)=>{
    console.log(result+err);
  })
  return  res.end();
}
module.exports.AJAX_HuyxacNhanUyQuyen=function (req, res) {
  account.updateOne({IDTaiKhoan:req.query.c},{VaiTro:"0",NguoiUyQuyen:"",ChucNang:""},(err,result)=>{
    console.log(result +err);
  })
  return  res.send("");
}
module.exports.AJAX_delActByCode=async function(req,res){
  let c=req.query.c;
  let i=await serviceActivity.delActByCode(c,req.user.IDTaiKhoan);
  console.log(i);
  return res.send(i);
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
