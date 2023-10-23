const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema =  require('./user');
//--------------------------------------------
const ProductInfo = new Schema({
    productName: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    fullDescription: {
        type: String,
        required: true
    },
    size: {
        type: String,//kích thước dài rộng cao
        require:true
    },
    color: {
        type: Array,// 1 list nhiều màu
        require: true
    },
    type:{
        type: Array,//vd: [Phòng khách,Sofa],...
        required: true
    },
    material: {
        type: String,
        require: true
    },
    weight: {
        type: Number,
        required: true
    },
    warrantySummary: { // thời hạn bảo hành
        type: String,
        required: true
    },
    images: {
        type: Schema.Types.ObjectId,
        ref: 'ProductImg',
        default: ""
    },
    rating: {
        type: Number
    },
    discount: {
        type: Number
    },
    review: [{
        type : Schema.Types.ObjectId,
        ref: 'ProductReview',
        default: ""
    }]
},{timestamps: false});// timestamp true thì có lưu thêm thuộc tính thời gian tạo

const ProductImg = new Schema ({
    productId : {
        type: Schema.Types.ObjectId,
        ref: 'ProductInfo'
    },
    Img_color1: {
        type: Array,
        required: true
    },
    Img_color2: {
        type: Array,
        required: true
    },
    Img_color3: {
        type: Array,
        required: true
    },
},{timestamps:false});

const ProductReview = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'ProductInfo'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'userInfo'
    },
    data: {
        type: String
    },
    userRating:{
        type: Number,
        required: true
    }
},{timestamps: true});

module.exports = {
    ProductInfo: mongoose.model('ProductInfo', ProductInfo),
    ProductImg: mongoose.model('ProductImg', ProductImg),
    ProductReview: mongoose.model('ProductReview',ProductReview)
};
