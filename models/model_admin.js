var mongoose = require('mongoose');


var adminSchema=new mongoose.Schema({
IDMaAdmin: String,
HoVaTen: String,
});

var admin=mongoose.model('Admin',adminSchema,'QuanTriVien');
module.exports=admin;