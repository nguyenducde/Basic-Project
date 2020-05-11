var noti=require('../models/model_noti');
var event=require('../models/module_event');
var diemdanh=require('../models/model_diemdanh');
var infoAc=require('../models/model_infoActivity')
module.exports.createNewActivity = async function (i){
    let act = new noti(i);
    await act.save({}, err => {
      if(err) throw err;
    });
  }
  module.exports.getAllMyActivities = async function (a) {
    let all = await infoAc.find({MSGV: a});
    return all;
  }

  module.exports.isCodeNotExist_code = async function (c,a) {
    let countall = await noti.find({code: c,auth:a}).count();
    if(countall > 0) return null;
    return c;
  }
 module.exports.findNameEvent=function(c){
   let all=event.find({TenSuKien:c})
 }
