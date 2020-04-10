var mongoose = require('mongoose');
var usergiaovien=new mongoose.Schema({
  MSGV:{type:mongoose.Schema.Types.ObjectId,ref:'GiaoVienS'},
  HoVaTen:String,
  UserName:String,
  PassWord:String
});
var UserTeacher=mongoose.model('UserTeacher',usergiaovien,'AccountGiaoVien');
module.exports=UserTeacher;