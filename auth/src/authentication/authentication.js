const { json, send, createError, sendError } = require('micro');
const { compareSync, hash } = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const { hashSync} = require('bcrypt');
var bcrypt = require('bcrypt');
const users = require('../services/user.service');
let mongoose = require('mongoose');
const assert = require('assert');
let responce = require('../services/responce.js');
let config = require('../services/config.yaml');

const { secret } = require('../config');
const User = require('../models/user');
let logintoken;
let id;

/**
* Attempt to authenticate a user.
*/
const attempt = (email, password) => {
  return User.find({ email: email }).exec().then((users, err) => {
    if (!users.length) {
      throw createError(401, 'That user does not exist');
    }
    const user = users[0];
    if (!compareSync(password, user.password)) {
throw createError(401, "password doesn't match");
    }
    return user;
  });
};

let loginprocess = function(id){
  try{
    payload = {
      "userId": id,
      "iat": Math.floor(Date.now() / 1000) - 30,
      "exp": Math.floor(Date.now() / 1000) + (60 * 60),
      "aud": "https://yourdomain.com",
      "iss": "feathers",
      "sub": "anonymous"
    }
    let token = sign(payload, secret);
    return {"status":1,"code":"201","message":"login succesfully",logintoken: token };
  }catch(err){
      throw createError(401, 'wrong credential');
  }
}


/**
* Authenticate a user and generate a JWT if successful.
*/
const auth = ({ email, password }) =>
attempt(email, password).then(({ id }) => {
  // console.log('auth_id:', id);
  // console.log('email:',email);
  // console.log('password:',password);
  return loginprocess(id);
});

const decode = token => verify(token, secret);
module.exports.login = async (req, res) => await auth(await json(req));
module.exports.decode = (req, res) => decode(req.headers['authorization']);

const sociallogin = (id) => {
  // console.log('social_id:',id);
  return loginprocess(id);
};

module.exports.sociallogin = sociallogin

module.exports.userdetails = async(req,res) => {
  let token = req.headers['authorization'];
  try {
    let data;
    data = verify(req.headers['authorization'], secret);
    return User.find({ _id: data.userId }).exec().then((users, err) => {
      if (!users.length) {
        throw createError(401, 'That user does not exist');
      }
      const data = users[0];
      let jsonString = {"status":1,"code":"201","message":"userdetails","data":data}
      return jsonString

    });
  } catch(err) {
    // err
    throw createError(401, 'invalid token');
  }
}

module.exports.googleauthprocess = async (req,res) => {
    req = await json(req)
    let aboutme=req.aboutme;
    let email=req.email;
    let ob_id = req.id;
    // console.log(ob_id);
    let users = await User.find({ _id: ob_id });
    // console.log(users);
    let data = users[0];
    // console.log("data:",data);

    if(users.length == 0){
      throw createError(401, 'user not exist');
    }else{
        // console.log("data:",data);
        let emailCheck = await User.find({ email: email });
        if(emailCheck.length != 0)
        {
          throw createError(409, 'Email already exist');
        }
        query = { _id: ob_id }
        const update = {
        $set: {"aboutme": aboutme, "email": email, "isEmailConfirm":1,"updated_at":new Date() }
      };

      let up= await User.findOneAndUpdate(query,update,{ returnNewDocument : true , new: true })
      const id = up._id;
      return loginprocess(id);
    }
  }
// };

module.exports.changepassword = async(req,res) => {

  let token = req.headers['authorization'];
  req = await json(req)
  let oldpass=req.oldpass;
  let newpass=req.newpass;
  try{
    let data = verify(token, secret);
    let users = await User.find({_id: data.userId});
    if (!users.length) {
      throw createError(401, 'That user does not exist');
    }
    let comparepass = await bcrypt.compare(oldpass, users[0].password);
    if(comparepass == false){
      throw createError(401, 'password does not match');
    }else {
      query = { _id: data.userId };
      const update = {$set: {"password":hashSync(newpass, 2), "updated_at":new Date() }};
      let up= await User.findOneAndUpdate(query,update,{ returnNewDocument : true, new: true })
      let jsonString = {"status":1,"code":"201","message":"change password successfully"}
      return jsonString
    }
  }catch(err) {
    throw createError(401, 'invalid token');
  }
};

function sendRejectResponce(status,code,message) {
  return new responce(status,code,message);
}
function sendSuccessResponce(status,code,message,logintoken){
  return new responce(status,code,message,logintoken);
}
