const express = require('express');
const httpMsgs=require('http-msgs');
var subjects=require('../models/model_subject');
var students=require('../models/model_student');
var router = express.Router();
var studentController=require('../controllers/student.controller');
router.get('/student',studentController.isNotLogined_next,studentController.getLogin);
router.post('/student',studentController.isNotLogined_next,studentController.postLogin);
router.get('/ajaxNotification',(req,res)=>{
    var data=req.param;
    console.log(data);
    let i=0;
    subjects.find({IDMonHoc:"TCC"},(err,result)=>{
        result.forEach(element => {
            students.findOne({MSSV:element.MSSV},(err,results)=>{
             if(results) console.log(results+req.user.IDTaiKhoan);
            })
            
        });
    });
   
    httpMsgs.sendJSON(req,res,{
    noti:"Tạo sự kiện thành công"
    });
    })
router.get('/student/logout',studentController.logOut);

module.exports =router;