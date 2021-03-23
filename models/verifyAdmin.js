const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    // firstname: {
    //     type: String,
    //     default: ''
    // },
    // lastname: {
    //     type: String,
    //     default: ''
    // },
    admin: {
        type: Boolean,
        default: false
    }

});

adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Admin', adminSchema);