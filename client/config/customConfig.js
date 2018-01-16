export default{
    user_auth: "http://auth."+process.env.domainkey,
    user_detail: "http://api."+process.env.domainkey+"/user", 
    loginWithGoogle: "http://auth."+process.env.domainkey+"/auth/Gplus",
    googleSuccessCallbackUrl: "http://mom."+process.env.domainkey,
    copyUrlPath: "http://mom."+process.env.domainkey,
    forgotpassword: "http://auth."+process.env.domainkey+"/api/forgetpassword",
    resetpassword: "http://auth."+process.env.domainkey+"/api/resetpassword"
}