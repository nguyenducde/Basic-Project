var mongoose = require('mongoose');
var giaovienSchema=new mongoose.Schema({
  MSGV:{type:Number,index:true,unique:true},
  HoVaTen:String,
  Lop:String,
  Khoa:String

});
var GiaoVien=mongoose.model('GiaoVienS',giaovienSchema,'GiaoVien');
module.exports=GiaoVien;