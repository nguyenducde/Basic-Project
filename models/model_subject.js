var mongoose = require('mongoose');


var subjectSchema=new mongoose.Schema({
  IDMonHoc:String,
  TenMonHoc:String,
  MSSV:{type:String,index:true,unique:true}
//IDTaiKhoan:{type:mongoose.Schema.Types.ObjectId,ref:'Accounts'}
 
});

var Subjects=mongoose.model('Subjects',subjectSchema,'MonHoc');
module.exports=Subjects;