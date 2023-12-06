const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartProduct = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "userInfo"},
    productList: [
        {
            productId: {type: Schema.Types.ObjectId, ref: "ProductInfo"},
            quantity: {type: Number, required: true},
            price: {type: Number, required: true}
        }
    ]
})
    
module.exports = mongoose.model('CartInfo', CartProduct);