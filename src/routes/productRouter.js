const router = require('express').Router();
const getAllProducts = require('../controller/productsController.js');

//---------------------------------------------
//CREATE - only for admin
const ProductInfo = require('../models/Product.js');
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