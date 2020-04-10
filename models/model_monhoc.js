var mongoose = require('mongoose');
var monhocSchema=new mongoose.Schema({
  IDMonHoc:{type:String,index:true,unique:true},
  MSGV:{type:mongoose.Schema.Types.ObjectId,ref:'GiaoVienS'},
  MSSV:{type:mongoose.Schema.Types.ObjectId,ref:'SinhVienS'},
  TenMonHoc:String,
  Ngay:Date,
  Lop:String

});
var MonHoc=mongoose.model('MonHocS',monhocSchema,'MonHoc');
module.exports=MonHoc;