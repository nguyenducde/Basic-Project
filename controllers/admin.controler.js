const passport = require('passport');
var admin=require('../models/model_admin');

//Check auth

module.exports.isNotLogined_next = async function (req, res, next) {
    if (!req.isAuthenticated('local-adminLogin')) return next();
    if(req.isAuthenticated('local-adminLogin')) return next();
   
  }
  
  module.exports.isLogined_next = async function (req, res, next) {
    if (req.isAuthenticated('local-adminLogin')) return next();
    return res.redirect('/admin');
  }
module.exports.getLogin= async function (req, res, next) {
    mess="";
   return res.render('./admin_views/login',mess);
}
module.exports.getHome= async function (req, res, next) {
    Mess="";
    admin.findOne({IDMaAdmin:req.user.IDTaiKhoan},(err,result)=>{
      console.log(result);
      return res.render('./admin_views/home',{
        mess:Mess,
        Profile:result
       });
    })
   
}
module.exports.postLoginAdmin = passport.authenticate('local-adminLogin', {
    successRedirect : '/admin-home',
    failureRedirect : '/admin',
    failureFlash : true
  });

module.exports.logOut=async function(req,res){
  req.session.destroy(function (err) {
  return   res.redirect('/admin'); //Inside a callback… bulletproof!
  });
}
