const router = require('express').Router();
const {registerUser, loginUser, userProfile, updateProfile} = require('../controller/usersController');
const authGuard = require('../middleware/authMiddleware');
//---------------------------------------------
//CREATE
router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/profile',authGuard, userProfile);
router.put('/updateProfile', authGuard, updateProfile);



//-----------------------------------------------------
module.exports = router;