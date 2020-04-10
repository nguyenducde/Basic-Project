var dbSinhVien=require('../../models/model_student');
module.exports.teacher=function(req,res){
 
    dbSinhVien.find((err,result)=>{res.render('./teacher_views/teacher.ejs',{list_student:result})}).sort({MSSV:1})
    
    
   
};
module.exports.teacher_face=function(req,res){res.render('./teacher_views/teacher_face.ejs')};
module.exports.teacher_tructiep=function(req,res){res.render('./teacher_views/teacher_tructiep.ejs')};
module.exports.teacher_qr=function(req,res){res.render('./teacher_views/teacher_qr.ejs')};
