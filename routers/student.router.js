const express = require('express');
var router = express.Router();
var studentController=require('../controllers/student.controller');


router.get('/student',studentController.isNotLogined_next,studentController.getLogin);
router.post('/student',studentController.isNotLogined_next,studentController.postLogin);
router.get('/student/logout',studentController.logOut);
router.get('/student_diemdanh',studentController.isLogined_next,studentController.getActStudent);

module.exports =router;