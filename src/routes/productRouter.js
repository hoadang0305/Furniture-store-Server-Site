const router = require('express').Router();
const ProductInfo = require('../models/product');
const getAllProducts = require('../controller/products.js');

//---------------------------------------------
//CREATE - only for admin
router.post('/newProduct', async (req,res) => {
    try {
        const newProduce = new ProductInfo({
            productName: req.body.productName,
            price: req.body.price,
            shortDescription: req.body.shortDescription,
            fullDescription: req.body.fullDescription,
            quantity: req.body.quantity,
            quantity_sale: req.body.quantity_sale,
            type: req.body.type,
            images: req.body.images,
            rating: req.body.rating,
            discount: req.body.discount,
            addInfo: req.body.addInfo
        });
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