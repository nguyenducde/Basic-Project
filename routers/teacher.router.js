var router=require('express').Router();

var teacherController=require('../controllers/teacher.controller');
router.get('/teacher',teacherController.isNotLogin_next,teacherController.getLogin);
router.post('/teacher',teacherController.isNotLogin_next,teacherController.postLogin);
router.get('/teacher_face',(req,res)=>{
res.render('./teacher_views/teacher_face');
})
router.post('/create-activity',  teacherController.postCreateActivity);
router.get('/teacher_tructiep', teacherController.isLogined_next, teacherController.getHome);
router.post('/ajax-new-code-activity', teacherController.isLogined_next, teacherController.AJAX_createNewCodeAct);
router.post('/ajax-del-activity', teacherController.isLogined_next, teacherController.AJAX_delActByCode);
router.post('/ajax-reload-activity', teacherController.isLogined_next, teacherController.AJAX_reloadAct);
router.get('/excel',teacherController.isLogined_next,teacherController.AJAX_saveExcel);
router.get('/teacher/logout',teacherController.logOut);

module.exports=router;

