var mongoose = require('mongoose');


var studentSchema=new mongoose.Schema({
  MSSV:{type:String,index:true,unique:true},
  HoVaTen:String,
  GioiTinh:String,
 Email:{type:String,unique:true},
 SDT:{type:String,unique:true},
 Lop:String,
 Khoa:String,
//IDTaiKhoan:{type:mongoose.Schema.Types.ObjectId,ref:'Accounts'}
 
});

var Students=mongoose.model('Students',studentSchema,'SinhVien');
module.exports=Students;