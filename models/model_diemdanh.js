var mongoose = require('mongoose');
var diemdanhSchema=new mongoose.Schema({
  IDMonHoc:{type:mongoose.Schema.Types.ObjectId,ref:'MonHocS'},
  MSGV:{type:mongoose.Schema.Types.ObjectId,ref:'GiaoVienS'},
  MSSV:{type:mongoose.Schema.Types.ObjectId,ref:'SinhVienS'},
  TenMonHoc:String,
  Ngay:Date,
  Buoi:String

});
var DiemDanh=mongoose.model('MonHocS',diemdanhSchema,'MonHoc');
module.exports=DiemDanh;