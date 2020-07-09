var router=require('express').Router();
var adminController=require('../controllers/admin.controler')
router.get( '/admin',adminController.getLogin);
router.post('/admin/manage',adminController.isNotLogined_next,adminController.postLoginAdmin);
router.post('/xacnhanUyQuyen',adminController.isLogined_next,adminController.AJAX_xacNhanUyQuyen);
router.post('/HuyUyQuyen',adminController.isLogined_next,adminController.AJAX_HuyxacNhanUyQuyen);
router.post('/DeleteAtAdmin',adminController.isLogined_next,adminController.AJAX_delActByCode);
router.post('/Admin-create-activity',adminController.isLogined_next,adminController.postCreateActivity);
router.post('/excelAdmin',adminController.isLogined_next,adminController.AJAX_saveExcel)
router.get('/admin-home',adminController.isLogined_next,adminController.getHome);
router.get('/adminLogOut',adminController.isLogined_next,adminController.logOut);
module.exports=router;