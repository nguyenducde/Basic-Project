var router=require('express').Router();
var adminController=require('../controllers/admin.controler')
router.get( '/admin',adminController.getLogin);
router.post('/admin/manage',adminController.isNotLogined_next,adminController.postLoginAdmin);
router.get('/admin-home',adminController.isLogined_next,adminController.getHome);
module.exports=router;