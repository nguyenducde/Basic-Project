var mongoose = require('mongoose');


var infoSchema=new mongoose.Schema({
IDHoatDong:String,
TenSuKien:String,
ThoiGian:Date,
MSGV:String,
//IDTaiKhoan:{type:mongoose.Schema.Types.ObjectId,ref:'Accounts'}
 
});

var Info=mongoose.model('Infomations',infoSchema,'ThongTinHoatDong');
module.exports=Info;