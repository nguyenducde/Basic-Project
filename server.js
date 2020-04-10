const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const port = 4000;
const path = require('path');
var mongoose = require('mongoose');
var teacheRoute=require('./routers/teacher_routers/teacher.router');

const {google} = require('googleapis');
const keys=require('./keys.json');
var testlogin=require('./routers/index_router');
//cấu hình
app.set('view engine', 'ejs');
//////////////////////////////////////////
const client=new google.auth.JWT(
keys.client_email,null,keys.private_key,['https://www.googleapis.com/auth/spreadsheets']
);

    client.authorize(function(err,tokens){
        if(err)
        {
            console.log(err);
            return;
        }
        else{
           console.log("Kết nối GoogleSheets thành công");
           gsrun(client);
        }
    })


async function gsrun(cl)
{
    const gsapi=google.sheets({version:'v4',auth:cl});
   const opt={
       //id gg sheets
       spreadsheetId:'1dmvytgNyj8KVAn81mf_Kep0hDwJbsxGkrcEBFqmxz74',
       range:'B2:C10'
   };
  let data= await gsapi.spreadsheets.values.get (opt);

  //console.log(data.data.values);
}

///test db
mongoose.connect('mongodb://nguyenducde:lalang123@cluster0-shard-00-00-pxb4j.mongodb.net:27017,cluster0-shard-00-01-pxb4j.mongodb.net:27017,cluster0-shard-00-02-pxb4j.mongodb.net:27017/DiemDanhDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {useUnifiedTopology: true,useNewUrlParser: true, useCreateIndex: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Kết nối mongodb atlas thành công");
});
//Test insert



app.use(express.static(__dirname + '/public'));

app.use(teacheRoute);
app.use(testlogin);
app.get('/qr',(req,res)=>{res.render('qr.ejs')})
app.get('/',(req,res)=>{res.render('index.ejs')})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));