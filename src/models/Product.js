const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//--------------------------------------------
const ProductInfo = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    originPrice:{
        type: Number,
        require: true
    },
    quantity:{// số lượng
        type: Number,
        required: true
    },
    quantitySale:{// số lượng đã bán
        type: Number,
        default: 0
    },
    shortDesc: {
        type: String,
        required: true,
        default: ""
    },
    fullDesc: {
        type: String,
        require: true,
        default: ""
    },
    type:{
        type: Array,//vd: [Phòng khách],...
        required: true
    },
    images: {
        type: Array
    },
    rating: {
        type: Number,
        default: 4.5
    },
    discount: {
        type: String,
    }
},{timestamps: false, toJSON: {virtuals: true}});// timestamp true thì có lưu thêm thuộc tính thời gian tạo=

module.exports = mongoose.model('ProductInfo',ProductInfo);