let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Address = new Schema({
	title: Array,
	log_date: Date
}, {
    collection: 'social_user'
});

let Social = mongoose.model('social_user',Address)

module.exports = Social
