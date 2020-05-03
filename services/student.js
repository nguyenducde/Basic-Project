var students=require('../models/model_student')
module.exports.findProfile= function(a){
    let all= students.findOne({MSSV:a});
    return all;
  }