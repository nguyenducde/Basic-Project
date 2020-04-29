var Account=require('../models/model_account');
var Students=require('../models/model_student');
var Teachers=require('../models/model_teacher');
module.exports.checkLogin=async function(a){
  let all=await Account.find({IDTaiKhoan:a});
  return all;
}