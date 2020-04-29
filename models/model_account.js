var mongoose = require('mongoose');

var accountSchema=new mongoose.Schema({
  IDTaiKhoan:{type:String,index:true,unique:true},
  PassWord:String,
  LoaiTaiKhoan:String

});

var Account=mongoose.model('Accounts',accountSchema,'TaiKhoan');
module.exports=Account;