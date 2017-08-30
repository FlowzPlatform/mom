"use strict";

// Responce is a base class
module.exports = class Responce {

    constructor (status,code,message,logintoken) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.logintoken = logintoken;
    }


    print () {
      console.log( this.toString() );
    }
}
