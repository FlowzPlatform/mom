const { json, send, createError, sendError } = require('micro');
const Pinfo = require('../models/personalinfo');
let responce = require('./responce');

module.exports.userdetails = async (req,res) => {
  userid = req.params.uid;
  try {
    let data = await Pinfo.find({ userid: userid })
    if (data != null) {
      let sucessReply = sendSuccessResponce(1,'201','User details',data);
      return sucessReply;
      } else{
        let rejectReply = sendRejectResponce(0,'404','data not found');
        return rejectReply;
      }
  } catch (err) {
    throw createError(403, 'error!');
  }
};

module.exports.updatedetails = async (req,res) => {
  userid = req.params.uid;
  body = req.body;
  query = { userid: userid };
  const update = {
    $set: body,
  };
  try {
    let data = await Pinfo.findOneAndUpdate(query,update,{ returnNewDocument : true, new: true })
    if (data != null) {
      let sucessReply = sendSuccessResponce(1,'201','Update User details',data);
      return sucessReply;
      } else{
        let rejectReply = sendRejectResponce(0,'404','data not found');
        return rejectReply;
      }
  } catch (err) {
    throw createError(403, 'error!');
  }
};

function sendRejectResponce(status,code,message) {
  return new responce(status,code,message);
}
function sendSuccessResponce(status,code,message,data){
  return new responce(status,code,message,data);
}
