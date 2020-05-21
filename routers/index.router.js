var router=require('express').Router();
var indexController=require('../controllers/index.controler');
router.get( '/',indexController.isLogined_next,indexController.index);
module.exports=router;
  