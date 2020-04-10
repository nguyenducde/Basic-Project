const express = require('express');
const app = express();
var router=require('express').Router();
var userTeacher=require('../models/model_userteacher');
const bodyParser = require('body-parser');
var dbSinhVien=require('../models/model_student');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/teacher',urlencodedParser,function(req,res){
    userTeacher.findOne({UserName:req.body.uname,PassWord:req.body.psw},(err,user)=>{
        if(err)
        {
           
          return res.status(500).send();
        }
        if(!user )
        {
           return res.render('./index.ejs');
        
        }
      
        dbSinhVien.find((err,result)=>{res.render('./teacher_views/teacher.ejs',{list_student:result}) }).sort({MSSV:1})
    
         })
            
})
module.exports=router;