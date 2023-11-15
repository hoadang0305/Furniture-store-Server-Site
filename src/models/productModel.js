const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//--------------------------------------------
const ProductInfo = new Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    origin_price:{
        type: Number,
        require: true
    },
    quantity:{// số lượng
        type: Number,
        required: true
    },
    quantity_sale:{// số lượng đã bán
        type: Number,
        required: true
    },
    shortDesc: {
        type: String,
        required: true
    },
    fullDesc: {
        type: Object,
        data: {
            brief: {type: String, default: ""},
            atrb1: {type:String,default: ""},
            atrb2: {type: String,default: ""},
            atrb3: {type:String,default: ""},
            atrb4: {type: String,default: ""},
            atrb5: {type:String,default: ""},
        }
    },
    addInfo: {
        type: Object,
        data: {
            dimension: {type:String,default: ""},//W-H-D
            atrb1: {type:String,default: ""},
            atrb2: {type: String,default: ""},
            atrb3: {type:String,default: ""},
            atrb4: {type: String,default: ""},
            atrb5: {type:String,default: ""}
        }
    },
    type:{
        type: Array,//vd: [Phòng khách],...
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
        type: String,
    }
},{timestamps: false, toJSON: {virtuals: true}});// timestamp true thì có lưu thêm thuộc tính thời gian tạo=

ProductInfo.virtual('ProductReviews',{
    ref: 'ProductReview',
    localField: '_id',
    foreignField: 'product'
});
module.exports = mongoose.model('ProductInfo',ProductInfo);