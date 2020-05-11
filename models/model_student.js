var mongoose = require('mongoose');


var studentSchema=new mongoose.Schema({
  MSSV:{type:String,index:true,unique:true},
  HoVaTen:{type:String,require:true},
  GioiTinh:{type:String,require:true},
 Email:{type:String,unique:true,require:true},
 SDT:{type:String,unique:true,require:true},
 Lop:String,
 Khoa:String,
//IDTaiKhoan:{type:mongoose.Schema.Types.ObjectId,ref:'Accounts'}
 
});

var Students=mongoose.model('Students',studentSchema,'SinhVien');
module.exports=Students;