const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userInfo = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    }

},{timestamps: false});

module.exports = mongoose.model('userInfo', userInfo);