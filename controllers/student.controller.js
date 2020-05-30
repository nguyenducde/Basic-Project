var passport=require('passport')
const httpMsgs=require("http-msgs");
var students=require('../models/model_student');
var event=require('../models/module_event');
var serviceActivity=require('../services/activity');
var diemdanh=require('../models/model_diemdanh')
const path = require('path');
const fs = require('fs');

module.exports.getLogin = function (req, res) {
 if(req.isAuthenticated('local-studentLogin')&&req.user.LoaiTaiKhoan=="Sinh Vien"){
  return  students.findOne({MSSV:req.user.IDTaiKhoan},(err,result)=>{
     if(result){
    return   res.render('./student_views/student',{profile:result});
  } });
}
 if(req.isAuthenticated('local-teacherLogin')&&req.user.LoaiTaiKhoan=="Giao Vien"){
  return res.redirect('/teacher');
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
  

  let act_Student=await serviceActivity.GetActStudent(req.user.IDTaiKhoan)
 
      return   res.render('./student_views/student-diemdanh',{
      UserStudent:act_Student,
      mess: req.flash('mess')
      });
   
}


//Save DiemDanh in databases
module.exports.saveDiemDanh=async function (req, res){
  var code=req.query.c;
  var pass=req.body.password;
  var image=req.body.image;
  let getNoti=await serviceActivity.findNoti(code);
  let getNameStudent=await serviceActivity.findNameStudent(req.user.IDTaiKhoan);

  //Check student đã điểm danh hay chưa
  let checkDiemDanh=await serviceActivity.checkDone(code,req.user.IDTaiKhoan);
  if(image=="")
  { 
    checkImage="ảnh";
    return res.send(checkImage);
  }
  else if(getNoti.MK!=pass){
    try {
      fs.unlinkSync("public/uploads/"+image);
      //file removed
    } catch(err) {
      console.error(err)
    }
    check=false;
    return res.send(check);
  }
  else if(checkDiemDanh.length>0||getNoti.MK!=pass){
    try {
      fs.unlinkSync("public/uploads/"+image);
      //file removed
    } catch(err) {
      console.error(err)
    }
    //not save database
    return res.send(checkDiemDanh);
  }
  else if(checkDiemDanh.length<=0&&getNoti.MK==pass)
  {
    //save database
    diemdanh.insertMany({
      IDHoatDong:code,
      TenSuKien:getNoti.TenSuKien,
      ThoiGian:getNoti.ThoiGian,
      HoVaTen:getNameStudent.HoVaTen,
      MSSV:req.user.IDTaiKhoan,
      Avatar:image
    },(err,result)=>{
      console.log(result);
    });
   return  res.send(checkDiemDanh);
  }
}


module.exports.uploadAndSave= async function (req, res) {
 var code=req.query.c;
  const imagePath = path.join('./public/uploads');
  const fileUpload = new serviceActivity.resize(imagePath);
  if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
  }

  let checkDiemDanh=await serviceActivity.checkDone(code,req.user.IDTaiKhoan);
  
    if(checkDiemDanh.length>0)
    {
      check=true;
      return res.send(check);
  
    }
    else {
      const filename = await fileUpload.save(req.file.buffer);
      return res.send(filename)
    }
  
 

}