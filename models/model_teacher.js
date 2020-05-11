var mongoose = require('mongoose');
var teacherSchema=new mongoose.Schema({
  MSGV:{type:Number,index:true,unique:true,require:true},
  Email:{type:String,require:true},
  HoVaTen:{type:String,require:true},
  SDT:{type:String,require:true},
  Khoa:{type:String,require:true},
  //IDTaiKhoan:{type:mongoose.Schema.Types.ObjectId,ref:'Accounts'}

});
var Teacher=mongoose.model('Teachers',teacherSchema,'GiaoVien');
module.exports=Teacher;