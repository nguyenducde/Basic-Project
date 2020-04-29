var mongoose = require('mongoose');


var studentSchema=new mongoose.Schema({
  MSSV:{type:Number,index:true,unique:true},
  HoVaTen:String,
  GioiTinh:String,
 Email:String,
 SDT:String,
 Lop:String,
 Khoa:String,
IDTaiKhoan:{type:mongoose.Schema.Types.ObjectId,ref:'Accounts'}
 
});

var Students=mongoose.model('Students',studentSchema,'SinhVien');
module.exports=Students;