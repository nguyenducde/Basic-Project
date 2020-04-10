var mongoose = require('mongoose');
var usersinhvien=new mongoose.Schema({
  MSSV:{type:mongoose.Schema.Types.ObjectId,ref:'SinhVienS'},
  HoVaTen:String,
  UserName:String,
  PassWord:String
});
var UserSinhVien=mongoose.model('UserStudent',usersinhvien,'AccountSinhVien');
module.exports=UserSinhVien;