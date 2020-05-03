var mongoose = require('mongoose');
var teacherSchema=new mongoose.Schema({
  MSGV:{type:Number,index:true,unique:true},
  Email:String,
  HoVaTen:String,
  SDT:String,
  Khoa:String,
  //IDTaiKhoan:{type:mongoose.Schema.Types.ObjectId,ref:'Accounts'}

});
var Teacher=mongoose.model('Teachers',teacherSchema,'GiaoVien');
module.exports=Teacher;