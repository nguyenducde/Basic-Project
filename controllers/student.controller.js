var passport=require('passport')
const httpMsgs=require("http-msgs");
var students=require('../models/model_student');
var event=require('../models/module_event');
var serviceActivity=require('../services/activity');
var account=require('../models/model_account');
var diemdanh=require('../models/model_diemdanh');
var infoAc=require('../models/model_infoActivity');
var noti=require('../models/model_noti');
const path = require('path');
const fs = require('fs');

module.exports.getLogin = function (req, res) {
 if(req.isAuthenticated('local-studentLogin')&&req.user.LoaiTaiKhoan=="Sinh Vien"){
  return  students.findOne({MSSV:req.user.IDTaiKhoan},(err,result)=>{
     if(result){

        account.findOne({IDTaiKhoan:req.user.IDTaiKhoan},(err,resultAccount)=>{
         
          return   res.render('./student_views/student',{
      
            profile:result,
            Persion:resultAccount
          });
        })
   
  }  
 });
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
  let checkDiemDanh= await serviceActivity.checkDone(code,req.user.IDTaiKhoan);
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
      console.log(err)
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
  return o;
}
module.exports.postCreateActivity = async function(req, res) {
    let name=req.body.name;
    let datetime= req.body.time;
    let lop=req.body.lop;
    let hocky=req.body.hocki;
    let pass=req.body.pass;
    let msgv=req.body.persionDecent;
    let checkNameEvent=serviceActivity.findNameEvent(name);
  
    let now = new Date();
  let code = add0(now.getDate())+add0(now.getMonth()+1)+''+now.getFullYear()+''+randomNum(4)+''+randomNum(4);
  var check;
  do {
    check = await serviceActivity.isCodeNotExist_code(code,req.user.IDTaiKhoan);
  } while (!check);

  let checkPerChucNang=await serviceActivity.findChucNang(req.user.IDTaiKhoan,name);
  console.log(checkPerChucNang);
  if(checkPerChucNang<=0)
  {
    return res.send(false);
  }
  else if(checkNameEvent==null||datetime==""||lop==""||hocky==""||pass==""||name=="")
    {
      req.flash("Tên sự kiện không phù hợp")
    return res.redirect('/student');
    }
    else if(checkPerChucNang<=0)
    { 
     return res.send(checkPerChucNang);
    }
  else{
        infoAc.insertMany({
            IDHoatDong:removeCharInStr('-',check),
            TenSuKien:name,
            Lop:lop,
            HocKy:hocky,
            ThoiGian:datetime,
            MSGV:msgv,
            MK:pass
        },(err,result)=>{
          console.log(result);
        })
      // console.log(re[i].MSSV);
      
      // noti.insertMany(info);
      event.find({TenSuKien:name,MSGV:msgv},(err,result)=>{
        result.forEach(element=>{
          //
          let info = {
            IDHoatDong: removeCharInStr('-',check),
            TenSuKien:name,
            Lop:lop,
            HocKy:hocky,
            ThoiGian:datetime,
            MSGV:msgv,
            MSSV:element.MSSV,
            MK:pass
          };
          noti.insertMany(info);
        })
      })
    }
    account.findOneAndUpdate({IDTaiKhoan:req.user.IDTaiKhoan},{VaiTro:"0",ChucNang:"",NguoiUyQuyen:""},(err,result)=>{
      console.log(result);
    })
    return  res.send(true);
  }


  

