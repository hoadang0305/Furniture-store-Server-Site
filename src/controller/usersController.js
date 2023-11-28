const User = require("../models/User");

const registerUser = async (req,res,next)=> {

    try {
        const {userName, email,phoneNumber, password} = req.body;

        //check whether user exists or not
        let user = await User.findOne({email});
        if (user) {
            throw new Error("have registered");
        }
        // creating a new user
        user = await User.create({
            userName, email,phoneNumber, password
        });
        return res.status(201).json({
            _id: user._id,
            userName : user.userName,
            email : user.email,
            token: await user.generateJWT(), 
        });

    } catch (error) {
        next(error);
    }
}

const loginUser = async (req,res,next) => {
    try {
        const {email , password} = req.body;
        let user = await User.findOne({email});
        if(!user){
            throw new Error("Email ot found");
        }

        if(await user.comparePassword(password)){
            return res.status(201).json({
                _id: user._id,
                userName : user.userName,
                email : user.email,
                token: await user.generateJWT(), 
            });
        } else {
            throw new Error("Invalid email or password");
        }
    } catch(error) {
        next(error);
    }
}

const userProfile = async (req,res,next) => {
    try {
        let user = await User.findById(req.user._id);
        if(user) {
            return res.status(201).json({
                _id: user._id,
                avatar : user.avatar,
                name : user.name,
                email : user.email
            });
        } else {
            let error = new Error("User not found");
            error.statusCode = 404;
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

const updateProfile = async (req,res,next) => {
    try {
        let user = await User.findById(req.user._id);

        if(!user){
            throw new Error("User not found");
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password && req.body.password.length < 6){
            throw new Error("Password length must be at least 6 character");
        } else if (req.body.password){
            user.password = req.body.password;
        }
        const updateUserProfile = await user.save();
        
        res.json({
            _id: updateUserProfile._id,
            name : updateUserProfile.name,
            email : updateUserProfile.email
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {registerUser, loginUser, userProfile, updateProfile};