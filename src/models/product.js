const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
    quantity:{// số lượng
        type: Number,
        required: true
    },
    quantity_sale:{// số lượng đã bán
        type: Number,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    fullDescription: {
        type: String,
    },
    addInfo: {
        type: String,
    },
    type:{
        type: String,//vd: [Phòng khách],...
        required: true
    },
    images: {
        type: Array,
        required: true,
    },
    rating: {
        type: Number,
        default: 3.5
    },
    discount: {
        type: Number,
        default: 0
    }
},{timestamps: false, toJSON: {virtuals: true}});// timestamp true thì có lưu thêm thuộc tính thời gian tạo=

ProductInfo.virtual('ProductReviews',{
    ref: 'ProductReview',
    localField: '_id',
    foreignField: 'product'
});
module.exports = mongoose.model('ProductInfo',ProductInfo);