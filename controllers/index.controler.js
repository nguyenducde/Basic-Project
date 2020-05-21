
const flash = require('connect-flash');
module.exports.index=function(req, res){
  //Check auth

    const errors=req.flash().error || [];
      if(errors){
       return  res.render('index',{errors})
      }

  }
  module.exports.isNotLogined_next = async function (req, res, next) {
    if (!req.isAuthenticated('local-studentLogin')) return next();
    if(req.isAuthenticated('local-studentLogin')) return next();
   
  }
  module.exports.isLogined_next = async function (req, res, next) {
    if (req.isAuthenticated('local-teacherLogin')&&req.user.LoaiTaiKhoan=="Giao Vien") return res.redirect('/teacher-tructiep');
    if (req.isAuthenticated('local-studentLogin')&&req.user.LoaiTaiKhoan=="Sinh Vien") return res.redirect('/student');
    return next();
  }
  