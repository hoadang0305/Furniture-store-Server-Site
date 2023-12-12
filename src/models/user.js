const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {hash, compare} = require('bcryptjs');
const {sign} = require('jsonwebtoken');


const userInfo = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    }
},{timestamps: false});

userInfo.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await hash(this.password,10);
        return next();
    }
    return next();
});

userInfo.methods.generateJWT = async function() {
    return await sign({id: this._id}, process.env.USER_TOKEN, {expiresIn: '30d',});
};

userInfo.methods.generateJWTSeller = async function() {
    return await sign({id: this._id}, process.env.SELLER_TOKEN, {expiresIn: '30d',});
};

userInfo.methods.comparePassword = async function(enteredPassword){
    return await compare(enteredPassword, this.password);
}


module.exports = mongoose.model('UserInfo', userInfo);