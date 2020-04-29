var router=require('express').Router();
var indexController=require('../controllers/index.controler');
router.get( '/',indexController.index);
module.exports=router;
  