const ProductInfo = require('../models/product');

const getAllProducts = async (req,res) => {
    try {
        const allProduct = await ProductInfo.find();
        res.status(200).json(allProduct);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
module.exports = getAllProducts;