var router=require('express').Router();
var teacher=require('../../controllers/teacher_controllers/teacher.controller');
router.get('/teacher',teacher.teacher);
router.get('/teacher_face',teacher.teacher_face);
router.get('/teacher_tructiep',teacher.teacher_tructiep);
router.get('/teacher_qr',teacher.teacher_qr);
module.exports=router;
