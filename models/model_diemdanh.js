var mongoose = require('mongoose');


var DiemDanhSchema=new mongoose.Schema({
IDHoatDong:String,
TenSuKien:String,
ThoiGian:Date,
HoVaTen:String,
MSSV:String
//IDTaiKhoan:{type:mongoose.Schema.Types.ObjectId,ref:'Accounts'}
 
});

var DiemDanh=mongoose.model('DiemDanhs',DiemDanhSchema,'DiemDanh');
module.exports=DiemDanh;