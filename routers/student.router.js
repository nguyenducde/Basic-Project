const express = require('express');
var router = express.Router();
var serviceActivity=require('../services/activity')
var studentController=require('../controllers/student.controller');
const multer = require('multer');




router.get('/student',studentController.isNotLogined_next,studentController.getLogin);
router.post('/student',studentController.isNotLogined_next,studentController.postLogin);
router.post('/createDiemDanh',serviceActivity.upload.single('image'),studentController.saveDiemDanh);
router.post('/upload',serviceActivity.upload.single('image'),studentController.uploadAndSave);
router.post('/createActivityStu',studentController.isLogined_next,studentController.postCreateActivity);
router.get('/student/logout',studentController.logOut);
router.get('/student-diemdanh',studentController.isLogined_next,studentController.getActStudent);

module.exports =router;