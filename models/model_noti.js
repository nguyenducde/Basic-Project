var mongoose = require('mongoose');


var notiSchema=new mongoose.Schema({
TenSuKien:String,
ThoiGian:Date,
MSGV:String,
MSSV:String
})

var Noti=mongoose.model('Notis',notiSchema,'ThongBao');
module.exports=Noti;