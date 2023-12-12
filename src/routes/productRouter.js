const router = require('express').Router();
const {getAllProducts,getAdminProduct,addProduct,updateProduct,deleteProduct } = require('../controller/productsController.js');
const {checkTokenAdmin,isAdmin} = require('../middleware/authMiddleware');
//---------------------------------------------
//CREATE - only for admin
const ProductInfo = require('../models/Product.js');
//GET ALL PRODUCT
//user
router.get('/',getAllProducts);
//admin
router.post('/createproduct', isAdmin,addProduct);
router.get('/getproduct', checkTokenAdmin,getAdminProduct);
router.put('/updateproduct/:id', checkTokenAdmin,updateProduct);
router.delete('/deleteproduct/:id', checkTokenAdmin,deleteProduct)
//-----------------------------------------------------
module.exports = router;