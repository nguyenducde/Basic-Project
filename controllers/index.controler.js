module.exports.index=function(req, res){
    const errors=req.flash().error || [];
      if(errors){
        res.render('index',{errors})
      }
      
  
  }
  
  