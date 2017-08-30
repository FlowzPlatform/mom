const User = require('../models/user');
const { hashSync } = require('bcrypt');
const { json, send, createError, } = require('micro');
const Promise = require('promise');
const crypto = require('crypto');
let responce = require('./responce');
let config = require('yaml-config');
let settings = config.readConfig('src/services/config.yaml');
const emailjs 	= require("emailjs");

module.exports.list = async () => {
  return await User.find();
};

const signup = ({ username,aboutme, fullname, firstname, lastname, email, password, dob, role, signup_type, image_name, image_url ,provider,access_token,picture}) =>
{
return getEmail(email).then((res)=>{

let user = new User({ username:username, aboutme:aboutme, fullname:fullname, firstname:firstname, lastname:lastname, email:email, password:hashSync(password, 2), dob:dob, role:role,signup_type:signup_type,image_name:image_name,image_url:image_url,forget_token_created_at:null,provider: null,access_token:null,picture:null  });
   user = user.save();
   let sucessReply = sendSuccessResponce(1,'200','you are successfully register...');
   return sucessReply;
 }).catch((err) => {
   console.log('err',err);
   throw createError(409, 'email already exists');
 })

}

module.exports.setup = async (req, res) => await signup(await json(req));

let getUsername = function(username){
  promise =  new Promise(function(resolve,reject){
    User.find({ username: username }).exec().then((users, err) => {
      if(users.length) {
        reject('That username already exist');
      }else{
        resolve('not exist')
      }
    })
  })

  return promise;
}


let getEmail = function(email){
  promise =  new Promise(function(resolve,reject){
    User.find({ email: email }).exec().then((users, err) => {
     if(users.length) {
        reject('That email already exist');
      }else{
        resolve('not exist')
      }
    })
  })

  return promise;
}

let sendemail = function(fullname,to,newToken,url){
        let link = url
        let resetlink = link+ "/" +newToken
        let server 	= emailjs.server.connect({
           user:    "testnewpo@officebrain.com",
           password:"7#&stNewP0",
           host:    "mail.officebrain.com",
           ssl:     true

        });

        server.send({
           text:    "reset your password",
           from:   "acharotariya@officebrain.com",
           to:      to,
           subject: "reset your password",
           attachment:
           [
             {
               data:
               "<html><body>Dear "+fullname+" ,<br>You have requested to reset your password. Go to the following url and set your new password.<br><br>"+resetlink+"<br>Thanks,<br>officebeacon llc <br><body></html>", alternative:true}
           ]
})


};

module.exports.sendemailapi = async (req,res) => {
  try{
    req = await json(req)

    let server2 	= emailjs.server.connect({
       host: req.host,
       user: req.user,
       password: req.password ,
       ssl: true
    });
    let  message	= {
       text:	req.text,
       from:	req.from,
       to:		req.to,
       cc:   req.cc,
       subject:	req.subject,
       attachment:
      [
         {data:"<html>"+req.body+"</html>", alternative:true},
         {path:req.path, type:req.type, name:req.name}
      ]
    };
    const send = await server2.send(message);
    let jsonString = {"status":1,"code":"201","message":"email succesfully send"}
    return jsonString
  }catch(err)
  {
    console.log(err);
    throw createError(500,"email sending error") ;
  }
}


module.exports.forgetpassword = async (req,res) => {
  req = await json(req)

  let to=req.email;
  let url=req.url;
  if(to == "" || to == null)
  {
    throw createError(401, 'please enter email');
  }else if(url == "" || url == null){
    throw createError(401, 'please enter reset url');
  }
  let users = await User.find({ email: to });
  let fullname = users[0].fullname;
  if(users.length === 0)
  {
    throw createError(401, 'please enter correct email');
  }else{
    const newToken = await generateToken();
    let arr = [];
    let o = {};
    o.token = newToken;
    arr.push(o);
    // console.log(arr);
    query = { email: to };
    const update = {$set: {"forget_token":newToken, "forget_token_created_at":new Date()}};
    await User.findOneAndUpdate(query,update,{ returnNewDocument : true, new: true })
    send(res,200,"your request for forgetpassword sent to your email")
    return sendemail(fullname,to,newToken,url)

  }
};

module.exports.resetpassword = async (req,res) => {
  req = await json(req)
  let password=req.new_password;
  let token=req.token;
  if( token == "" || token == null ){
      throw createError(401, 'invalid token...');
  }
  let users = await User.find({forget_token: token});

  if(users.length === 0){
    throw createError(401, 'invalid token...');
  }else{
  let date1 = new Date(users[0].forget_token_created_at);
  let date2 = new Date();
  let timeDiff = Math.abs(date2-date1)/(60*60*1000);
  if(timeDiff<1){
    query = { forget_token: token }
    const update = {
      $set: {"password":hashSync(password, 2), "updated_at":new Date(),forget_token:null}
    };
     await User.findOneAndUpdate(query,update,{ returnNewDocument : true , new: true })
     let sucessReply = sendSuccessResponce(1,'200','successfully resetpassword...');
     return sucessReply;
  }
  else {
    throw createError(401, 'invalid token');
  }
}
};

function generateToken(stringBase = 'base64') {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(48, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString(stringBase));
      }
    });
  });
}


function sendRejectResponce(status,code,message) {
  return new responce(status,code,message);
}
function sendSuccessResponce(status,code,message,logintoken){
  return new responce(status,code,message,logintoken);

}
