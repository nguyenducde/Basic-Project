var mongoose = require('mongoose');


var eventSchema=new mongoose.Schema({
  IDSuKien:String,
  TenSuKien:String,
  MSSV:{type:String,index:true,unique:true}
//IDTaiKhoan:{type:mongoose.Schema.Types.ObjectId,ref:'Accounts'}
 
});

var Event=mongoose.model('Subjects',eventSchema,'SuKien');
module.exports=Event;