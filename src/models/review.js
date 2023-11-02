const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductReview = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'ProductInfo',
        required: true
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

module.export = mongoose.model('ProductReview',ProductReview);