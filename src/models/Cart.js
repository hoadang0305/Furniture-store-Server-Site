const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartProduct = new Schema({
    userId: {type:String, require: true},
    productList: [
        {
            productName: {type: String, required: true},
            quantity: {type: Number, required: true},
            price: {type: Number, required: true},
            total: {type: Number, required: true}
        }
    ]
})

module.exports = mongoose.model('CartInfo', CartProduct);