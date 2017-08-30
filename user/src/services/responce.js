"use strict";

// Responce is a base class
module.exports = class Responce {

    constructor (status,code,message,data) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
    }


    print () {
      console.log( this.toString() );
    }
}
