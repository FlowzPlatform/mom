const { json, send, createError } = require('micro');
const microAuthTwitter = require('microauth-twitter');
const authTwitter = require('./authentication');
const redirect = require('micro-redirect')
const index = require('../../index')
const twitterAuth = microAuthTwitter(index.options);
 const User = require('../models/user');

module.exports.twitter = twitterAuth( async (req, res, auth) => {
  console.log(auth);
  let id = auth.result.info.id
  let provider = auth.result.provider
  let fullname = auth.result.info.name
  let picture = auth.result.info.profile_image_url
  let access_token = auth.result.accessToken

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
           console.log(err);
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
       token = authTwitter.sociallogin(ob_id);
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
