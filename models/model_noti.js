var mongoose = require('mongoose');


var notiSchema=new mongoose.Schema({
//IDSuKien:,
TenSuKien:String,
//ThoiGian:datetime.datetime.now(),
});

var Noti=mongoose.model('Notis',notiSchema,'ThongBao');
module.exports=Noti;