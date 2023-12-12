const router = require('express').Router();
const {registerUser, loginUser, userProfile, updateProfile, loginAdmin,registerAdmin} = require('../controller/usersController');
const {authGuard,isAdmin} = require('../middleware/authMiddleware');
//---------------------------------------------
//CREATE
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/admin-login',isAdmin,loginAdmin);
router.post('/admin-register',registerAdmin);
router.get('/profile',authGuard, userProfile);
router.put('/updateProfile', authGuard, updateProfile);




//-----------------------------------------------------
module.exports = router;