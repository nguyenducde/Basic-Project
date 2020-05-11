var mongoose = require('mongoose');


var eventSchema=new mongoose.Schema({
  IDSuKien:{type:String,require:true},
  TenSuKien:{type:String,require:true},
  MSSV:{type:String,require:true},
  MSGV:{type:String,require:true}
//IDTaiKhoan:{type:mongoose.Schema.Types.ObjectId,ref:'Accounts'}
 
});

var Event=mongoose.model('Subjects',eventSchema,'SuKien');
module.exports=Event;