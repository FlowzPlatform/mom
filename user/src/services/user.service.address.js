const { json, send, createError, sendError } = require('micro');
const Addr = require('../models/address');
let responce = require('./responce');

module.exports.useraddress = async (req,res) => {
  userid = req.params.uid;

  try {
      let data =  await Addr.find({ userid: userid });
      if (data != null) {
        let sucessReply = sendSuccessResponce(1,'201','Address',data);
        return sucessReply;
      } else{
        let rejectReply = sendRejectResponce(0,'404','data not found');
        return rejectReply;
      }
  } catch (err) {
    throw createError(403, 'error!');
  }
};



module.exports.updateaddress = async (req,res) => {
  userid = req.params.uid;
  body = req.body;
  query = { userid: userid };
  const update = {
    $set: body,
  };
  try {
    let data = await Addr.findOneAndUpdate(query,update,{ returnNewDocument : true, new: true })
    if (data != null) {
      let sucessReply = sendSuccessResponce(1,'201','Address is updated',data);
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
