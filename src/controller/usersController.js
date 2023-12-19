const User = require("../models/User");

const registerUser = async (req,res,next)=> {

    try {
        const {userName, email,phoneNumber, password} = req.body;

        //check whether user exists or not
        let user = await User.findOne({email});
        if (user) {
            throw new Error("Email is ready exists");
        }
        // creating a new user
        user = await User.create({
            userName, email,phoneNumber, password
        });
        return res.status(201).json({
            _id: user._id,
            userName : user.userName,
            email : user.email,
            phoneNumber: user.phoneNumber,
            token: await user.generateJWT(), 
        });

    } catch (error) {
        next(error);
    }
}

const loginUser = async (req,res,next) => {
    try {
        console.log(req.body);
        const {email , password} = req.body;
        let user = await User.findOne({email});
        if(!user){
            throw new Error("Email not found");
        }

        if(await user.comparePassword(password)){
            return res.status(201).json({
                _id: user._id,
                userName : user.userName,
                email : user.email,
                phoneNumber: user.phoneNumber,
                token: await user.generateJWT(), 
            });
        } else {
            throw new Error("Invalid password");x
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
                email : user.email,
                phoneNumber: user.phoneNumber
            });
        } else {
            throw new Error("User not found");
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

        user.userName = req.body.userName || user.userName;
        user.email = req.body.email || user.email;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        const updateUserProfile = await user.save();
        
        res.status(201).json({
            _id: updateUserProfile._id,
            userName: updateUserProfile.userName,
            email: updateUserProfile.email,
            phoneNumber: updateUserProfile.phoneNumber
        })
    } catch (error) {
        next(error);
    }
}

const loginAdmin = async (req, res, next) => {
    try {
        const {email , password} = req.body;
        let user = await User.findOne({email});
        if(await user.comparePassword(password)){
            return res.status(201).json({
                _id: user._id,
                userName : user.userName,
                email : user.email,
                phoneNumber: user.phoneNumber,
                token: await user.generateJWTSeller(), 
            });
        } else {
            throw new Error("Invalid password");
        }
    } catch(error) {
        next(error);
    }
}
//only for testing
const registerAdmin = async(req, res, next)=> {
    try {
        const {userName, email,phoneNumber, password} = req.body;

        //check whether user exists or not
        let user = await User.findOne({email});
        if (user) {
            throw new Error("have registered");
        }
        // creating a new user
        user = await User.create({
            userName, email,phoneNumber, password, role: "admin"
        });
        return res.status(201).json({
            _id: user._id,
            userName : user.userName,
            email : user.email,
            phoneNumber: user.phoneNumber,
            //token: await user.generateJWTSeller(), 
        });

    } catch (error) {
        next(error);
    }
}
module.exports = {registerUser, loginUser, userProfile, updateProfile, loginAdmin, registerAdmin};   