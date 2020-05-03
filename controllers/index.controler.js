
const flash = require('connect-flash');
module.exports.index=function(req, res){
    const errors=req.flash().error || [];
      if(errors){
       return  res.render('index',{errors})
      }

  }
  
  