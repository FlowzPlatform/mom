let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Address = new Schema({
	firstName: String,
	lastName: String,
	emailId: String,
	address1: String,
	address2: String,
	country: String,
	province: String,
	city: String,
	postalCode: String,
	phoneNumber: String,
	mobileNumber: String,
	UserId: String,
	CreatedOn: String
}, {
    collection: 'address'
});

let Addr = mongoose.model('address',Address)

module.exports = Addr
