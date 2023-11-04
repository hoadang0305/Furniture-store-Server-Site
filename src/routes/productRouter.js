const router = require('express').Router();
const ProductInfo = require('../models/product');
const getAllProducts = require('../controller/products.js');

//---------------------------------------------
//CREATE - only for admin
router.post('/newProduct', async (req,res) => {
    try {
        const newProduce = new ProductInfo(req.body);
        const product = await newProduce.save();
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET ALL PRODUCT
router.get('/',getAllProducts);
//-----------------------------------------------------
module.exports = router;