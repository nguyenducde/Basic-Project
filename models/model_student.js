var mongoose = require('mongoose');
var sinhvienSchema=new mongoose.Schema({
  MSSV:{type:Number,index:true,unique:true},
  HoVaTen:String,
  GioiTinh:String,
 Email:String,
 SDT:String,
 Lop:String,
 Khoa:String,
 HinhAnh:String,
 
});
var SinhVien=mongoose.model('SinhVienS',sinhvienSchema,'SinhVien');
module.exports=SinhVien;