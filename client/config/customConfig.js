export default{
    user_auth: "https://auth."+process.env.domainkey,
    user_detail: "https://api."+process.env.domainkey+"/user",
    loginWithGoogle: "https://auth."+process.env.domainkey+"/auth/Gplus",
    googleSuccessCallbackUrl: "https://mom."+process.env.domainkey,
    copyUrlPath: "https://mom."+process.env.domainkey,
    forgotpassword: "https://auth."+process.env.domainkey+"/api/forgetpassword",
    resetpassword: "https://auth."+process.env.domainkey+"/api/resetpassword"
}
