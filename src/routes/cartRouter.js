const router = require('express').Router();
//---------------------------------------------
const {getCart,addProduct,deleteProduct,deleteAllProduct } = require('../controller/cartsController');
const {authGuard} = require('../middleware/authMiddleware');
//---------------------------------------------

router.get('/info',authGuard, getCart);
router.post('/addToCart', authGuard, addProduct);
//router.put('/updateCart/:id',authGuard, updateCart);
router.delete('/deleteProduct',authGuard, deleteProduct);
router.delete('/deleteAll', authGuard, deleteAllProduct);
//-----------------------------------------------------
module.exports = router;