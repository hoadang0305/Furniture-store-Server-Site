const router = require('express').Router();
const {getAllProducts,getProduct,addProduct,updateProduct,deleteProduct } = require('../controller/productsController.js');
const {checkTokenAdmin,checkValidProduct} = require('../middleware/authMiddleware');
const {upload} = require('../multer.js');
//---------------------------------------------
//CREATE - only for admin
const ProductInfo = require('../models/Product.js');
//GET ALL PRODUCT
//user
router.get('/',getAllProducts);
router.get('/:id', getProduct);
//admin
router.post('/createproduct', checkTokenAdmin,checkValidProduct,upload.array('image',4) ,addProduct);
router.put('/updateproduct/:id', checkTokenAdmin,updateProduct);
router.delete('/deleteproduct/:id', checkTokenAdmin,deleteProduct)
//-----------------------------------------------------
module.exports = router;