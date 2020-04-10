/*const bodyParser = require('body-parser');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
userTeacher.findOne({username:req.body.uname,password:req.body.psw},(err,user)=>{
    if(err)
    {
        console.log(err);
        return res.status(500).send();
    }
    if(!user)
    {
       return res.status(404).send();
    
    }
    return res.render('./teacher_views/teacher.ejs');
        })*/