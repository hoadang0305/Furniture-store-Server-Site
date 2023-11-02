const router = require('express').Router();
const UserInfo = require('../models/user');
const bcrypt = require('bcrypt');// băm password 
//---------------------------------------------
//CREATE
router.post('/newUser', async (req,res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        console.log(1);
        req.body.password = await bcrypt.hash(req.body.password,salt);
        console.log(1);
        const newUser = new UserInfo({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            profilePic: req.body.profilePic
        });
        console.log(1);
        const user = await newUser.save();
        res.status(200).json(user);
        console.log(1);
    } catch (err) {
        res.status(500).json(err);
    }
})



//-----------------------------------------------------
module.exports = router;