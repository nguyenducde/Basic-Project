var router=require('express').Router();

var teacherController=require('../controllers/teacher.controller');
router.get('/teacher',teacherController.isNotLogin_next,teacherController.getLogin);
router.post('/teacher',teacherController.isNotLogin_next,teacherController.postLogin);
router.get('/teacher_face',(req,res)=>{
res.render('./teacher_views/teacher_face');
})
router.get('/teacher_tructiep',(req,res)=>{
    res.render('./teacher_views/teacher_tructiep');
    })

router.get('/teacher/logout',teacherController.logOut);
module.exports=router;

