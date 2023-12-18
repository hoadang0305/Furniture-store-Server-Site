const router = require('express').Router();
//---------------------------------------------
const {getCart,addProduct,deleteProduct } = require('../controller/cartsController');
const {authGuard} = require('../middleware/authMiddleware');
//---------------------------------------------

router.get('/info',authGuard, getCart);
router.post('/addToCart', authGuard, addProduct);
//router.put('/updateCart/:id',authGuard, updateCart);
router.delete('/deleteProduct',authGuard, deleteProduct)
//-----------------------------------------------------
module.exports = router;