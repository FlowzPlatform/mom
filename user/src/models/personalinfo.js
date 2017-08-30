let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PersonalInfo = new Schema({
  firstname : String,
  lastname : String,
  email : String,
  userid : String
}, {
    collection: 'personalInformation'
});

let Personal = mongoose.model('personalInfo',PersonalInfo)

module.exports = Personal
