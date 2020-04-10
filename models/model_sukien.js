var mongoose = require('mongoose');
var sukienSchema=new mongoose.Schema({
    IDSuKien:{type:String,index:true,unique:true},
  MSGV:{type:mongoose.Schema.Types.ObjectId,ref:'GiaoVienS'},
  MSSV:{type:mongoose.Schema.Types.ObjectId,ref:'SinhVienS'},
  Buoi:String,
  ThoiGian:Date
});
var SuKien=mongoose.model('SuKienS',sukienSchema,'SuKien');
module.exports=SuKien;