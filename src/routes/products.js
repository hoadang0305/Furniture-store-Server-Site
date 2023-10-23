const router = require('express').Router();
const {ProductInfo, ProductImg, ProductReview} = require('../models/product');

//---------------------------------------------
//CREATE - only for admin
router.post('/newProduct', async (req,res) => {
    try {
        const newProduce = new ProductInfo({
            productName: req.body.productName,
            price: req.body.price,
            shortDescription: req.body.shortDescription,
            fullDescription: req.body.fullDescription,
            size: req.body.size,
            color: req.body.color,
            type: req.body.type,
            material: req.body.material,
            weight: req.body.weight,
            warrantySummary: req.body.warrantySummary,
            images: req.body.images,
            rating: req.body.rating,
            discount: req.body.discount,
            review: req.body.review,
        });
        const product = await newProduce.save();
        res.status(200).json(newProduce);
    } catch (err) {
        res.status(500).json(err);
    }
})




//-----------------------------------------------------
module.exports = router;