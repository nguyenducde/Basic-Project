var router=require('express').Router();
var teacherController=require('../controllers/teacher.controller');
router.get('/teacher',teacherController.isNotLogined_next,teacherController.getLogin);
router.post('/teacher',teacherController.isNotLogined_next,teacherController.postLogin);
router.get('/teacher/logout',teacherController.logOut);
module.exports=router;

