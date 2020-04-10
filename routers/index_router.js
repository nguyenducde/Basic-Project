const express = require('express');
const app = express();
var router=require('express').Router();
var userTeacher=require('../models/model_userteacher');
const bodyParser = require('body-parser');
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
        return res.render('./teacher_views/teacher.ejs');
            })
            
})
module.exports=router;