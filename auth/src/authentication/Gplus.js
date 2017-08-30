const microAuthGoogle = require('googleauth-micro');
const sleep = require('then-sleep')
const { json, send, createError } = require('micro');
const authGoogle = require('./authentication');
const redirect = require('micro-redirect')
const index = require('../../index')
const googleAuth = microAuthGoogle(index.options);
const User = require('../models/user');

module.exports.Gplus = googleAuth(async(req, res, auth) => {
  console.log(auth);

  var id = auth.result.info.id
  var provider = auth.result.provider
  var firstname = auth.result.info.given_name
  var lastname = auth.result.info.family_name
  var picture = auth.result.info.picture
  var fullname = auth.result.info.name
  var access_token = auth.result.access_token
  var picture = auth.result.info.picture

 let data_length = await User.find({ social_uid: id });
 let data = data_length[0];


  if (!auth) {
    return send(res, 404, 'Not Found');
  }

  if (auth.err){
    // Error handler
    //fail url
    return send(res, 403, 'Forbidden');
  }

// console.log("googletoken",token);
  if( data_length.length == 0){
    let user = new User({ aboutme:null, fullname:fullname, firstname:null, lastname:null, email:null, password:null, dob:null, role:null,signup_type:null,image_name:null,image_url:picture,forget_token_created_at:null,provider:provider,access_token:access_token,isEmailConfirm:0,social_uid:id});
      user.save(function(err){
        if(err)
        {
          throw createError(401, 'data insertaion failure');
        }
        else{
          //console.log(user._id);
          let ob_id = user._id;
          const statusCode = 302
          const location = index.redirect_app_url+'?ob_id='+ob_id
          redirect(res, statusCode, location)

        }
      });
    }else if(data.isEmailConfirm == 1){
      let ob_id = data._id;
      token = authGoogle.sociallogin(ob_id);
      const logintoken  = token.logintoken;
      const statusCode = 302
      const location = index.redirect_app_url+'?token='+logintoken
      redirect(res, statusCode, location)
    }else{
      let ob_id = data._id;
      const statusCode = 302
      const location = index.redirect_app_url+'?ob_id='+ob_id
      redirect(res, statusCode, location)
    }
});
