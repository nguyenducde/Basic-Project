
const multer = require('multer');
const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');

var noti=require('../models/model_noti');
var event=require('../models/module_event');
var diemdanh=require('../models/model_diemdanh');
var infoAc=require('../models/model_infoActivity')
var students=require('../models/model_student');
var InforEvent=require('../models/model_infoEvent');
var account=require('../models/model_account');
//----------------------Activity Teacher--------------------------------- 
module.exports.createNewActivity = async function (i){
    let act = new noti(i);
    await act.save({}, err => {
      if(err) throw err;
    });
  }
  module.exports.getAllMyActivities = async function (a) {
    let all = await infoAc.find({MSGV: a});
    return all;
  }
  module.exports.isCodeNotExist_code = async function (c,a) {
    let countDocumentsall = await noti.find({IDHoatDong: c,MSGV:a}).countDocuments();
    if(countDocumentsall > 0) return null;
    return c;
  }
 module.exports.findNameEvent=function(c){
   let all=event.find({TenSuKien:c})
   return all;
 }
 //Work in student
 module.exports.getListJoin=function(c){
  let all=event.find({MSGV:c})
  return all;
}
module.exports.delActByCode=async function(c,a){

  let act=await infoAc.findOneAndDelete({IDHoatDong:c,MSGV:a});
  await noti.deleteMany({IDHoatDong:c,MSGV:a});
  //delete file image
  await diemdanh.find({IDHoatDong:c},(err,result)=>{
    result.forEach(element=>{
      try {
        fs.unlinkSync("public/uploads/"+element.Avatar);
        //file removed
      } catch(err) {
        console.error(err)
      }
    })
  });
  await diemdanh.deleteMany({IDHoatDong:c});
  
  if(act)return act.TenSuKien;
  return null;
}
module.exports.GetActStudent=async function(c,a){
  let all=await noti.find({MSSV:c});
  return all;
}
//Find student join
module.exports.findStudentJoin=async function(c,a){
  let all=await diemdanh.find({MSGV:c,ThoiGian:a});
  return all;
}
//Export to excel
module.exports.exportExcel=async function(c){
  let all=await diemdanh.find({IDHoatDong:c});
  return all;
}
//Refesh student điểm danh
module.exports.refresh=async function(c){
  let all=await diemdanh.find({IDHoatDong:c});
  return all;
}
module.exports.getDiemDanh=async function(){
  let all=await diemdanh.find({});
  return all;
}

//----------------------Activity Student--------------------------------- 
//Check student đã điểm danh chưa
module.exports.checkDone=async function(code,id,thoigian){
  let all=await diemdanh.find({IDHoatDong:code,MSSV:id});
  return all;
}
module.exports.findNoti =async function (code) {
  let all =await noti.findOne({IDHoatDong: code});
  return all;
}
module.exports.findNameStudent=async function (name){
  let all=await students.findOne({MSSV:name});
  return all;
}
module.exports.upload= multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
});
module.exports.resize =class Resize {
  constructor(folder) {
    this.folder = folder;
  }
  async save(buffer) {
    const filename = Resize.filename();
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(90, 90, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFile(filepath);
    
    return filename;
  }
  static filename() {
    return `${uuidv4()}.png`;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
//Phân quyền
module.exports.getListInfo = async function(c){
  let all=InforEvent.find({MSGV:c});
  return all;
}
module.exports.findChucNang=async function (c,chucnang){
  let all=account.find({IDTaiKhoan:c,ChucNang:chucnang}).countDocuments();
  return all;
}
module.exports.findAllAccount=async function (req, res)
{
  let all=account.find({});
  return all;
}