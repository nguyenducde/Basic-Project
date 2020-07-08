var mongoose = require('mongoose');


var infoEventSchema=new mongoose.Schema({
    IDSuKien:{type:String,require:true},
    TenSuKien:{type:String,require:true},
    MSSV:{type:String,require:true},
    MSGV:{type:String,require:true},
    HoVaTen:{type:String,require:true}
//IDTaiKhoan:{type:mongoose.Schema.Types.ObjectId,ref:'Accounts'}
 
});

var InfoEvent=mongoose.model('InfoEvent',infoEventSchema,'ThongTinSuKien');
module.exports=InfoEvent;