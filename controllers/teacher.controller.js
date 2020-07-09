var passport=require('passport')
const flash = require('connect-flash');
var serviceActivity=require('../services/activity.js');
var noti=require('../models/model_noti');
var event=require('../models/module_event');
var account=require('../models//model_account');

var infoAc=require('../models/model_infoActivity')
const Excel = require('exceljs');
var fs = require("fs");
var path = require("path");


module.exports.getLogin = function (req, res) {
 if(req.isAuthenticated('local-teacherLogin')&&req.user.LoaiTaiKhoan=="Giao Vien"){
  return res.render('./teacher_views/teacher-tructiep');
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
    successRedirect : '/teacher-tructiep',
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
  let datetime= req.body.time;
  let lop=req.body.lop;
  let hocky=req.body.hocki;
  let pass=req.body.password;
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
  return res.redirect('/teacher-tructiep');
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
  return  res.redirect('/teacher-tructiep');
}
module.exports.getHome = async function (req, res) {

  let activities = await serviceActivity.getAllMyActivities(req.user.IDTaiKhoan);
  let listJoin=await serviceActivity.getListJoin(req.user.IDTaiKhoan);
 let listDiemDanh=await serviceActivity.getDiemDanh();
 let infoEvent=await serviceActivity.getListInfo(req.user.IDTaiKhoan);
  return res.render('./teacher_views/teacher-tructiep', {
    user: req.user,
    act: activities,
    listStudent:listJoin,
    mess: req.flash('mess'),
    listStudentDiemDanh:listDiemDanh,
    listInfoEvent:infoEvent
   // actRD: activitiesReady
  });
}
module.exports.AJAX_createNewCodeAct = async function (req, res) {
  let now = new Date();
  let code = add0(now.getDate())+add0(now.getMonth()+1)+''+now.getFullYear()+''+randomNum(4)+''+randomNum(4);
  var check;
  do {
    check = await serviceActivity.isCodeNotExist_code(code,req.user.IDTaiKhoan);
  } while (!check);
  return res.send(check);
}


module.exports.AJAX_delActByCode=async function(req,res){
  let c=req.query.c;
  let i=await serviceActivity.delActByCode(c,req.user.IDTaiKhoan);
  console.log(i);
  return res.send(i);
}

module.exports.AJAX_reloadAct=async function(req,res){
  let a=await serviceActivity.getAllMyActivities(req.user.MSGV);
  res.send(a);
}
//Export DiemDanh to excel
module.exports.AJAX_saveExcel=async function(req,res){
  var all=await serviceActivity.exportExcel(req.query.c);
  var workbook = new Excel.Workbook();

	// workbook.creator = 'Me';
	// workbook.lastModifiedBy = 'Her';
	// workbook.created = new Date(1985, 8, 30);
	// workbook.modified = new Date();
	// workbook.lastPrinted = new Date(2016, 9, 27);
	// workbook.properties.date1904 = true;

  workbook.views = [
    {
      x: 0, y: 0, width: 25000, height: 10000,
      firstSheet: 0, activeTab: 1, visibility: 'visible'
    }
  ]
  

  // Create a sheet
  var sheet = workbook.addWorksheet('Sheet1',{
    pageSetup:{paperSize: 9, orientation:'landscape',verticalCentered:true}
  }, {properties:{tabColor:{argb:'FF00FF00'}}});
  
  // A table header
  sheet.columns = [
      { header: 'STT', key: 'IDHoatDong',width: 10 },
      { header: 'Tên Hoạt động', key: 'TenSuKien',width: 25 },
      { header: 'MS Sinh Viên', key: 'MSSV',width: 25 },
      { header: 'Họ Và Tên', key: 'HoVaTen' ,width: 40},
      { header: 'Thời Gian', key: 'ThoiGian',width: 30 },
    
   
  ]
  // Add rows in the above header
  for (let i = 0; i < all.length; i++) {
    
    sheet.addRow({IDHoatDong: i+1, TenSuKien: all[i].TenSuKien,MSSV:all[i].MSSV,HoVaTen:all[i].HoVaTen, ThoiGian:all[i].ThoiGian });
  }

	res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
	res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
	workbook.xlsx.write(res)
		.then(function (data) {
			res.end();
			console.log('File write done........');
		});
 
}

//Refresh student attendance
module.exports.AJAX_refresh=async function(req,res){
  var studentAttendance=await serviceActivity.refresh(req.query.c);
 
  return res.send(studentAttendance)
}
module.exports.AJAX_Dencention =async function(req,res){
  var MSSV=req.query.c;
  var MSGV=req.query.msgv;
  var TenSuKien=req.query.tensukien;
  console.log(MSSV+ MSGV+ TenSuKien);
  account.findOneAndUpdate({IDTaiKhoan:MSSV},{VaiTro:1,ChucNang:TenSuKien,NguoiUyQuyen:MSGV},(err,result)=>{
    console.log(result);
  })
  return res.send("Thành công");
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
  return o;}