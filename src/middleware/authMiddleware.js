const {verify} = require('jsonwebtoken');
const User = require('../models/User');

const authGuard = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1];

            if (!token) {
                return res.status(401).json({ error: "Not authorized, No token" });
            }

            try {
                const { id } = verify(token, process.env.USER_TOKEN);
                req.user = await User.findById(id).select("-password");

                if (!req.user) {
                    return res.status(401).json({ error: "Not authorized, Token failed" });
                }

                next();
            } catch (err) {
                next(err);
            }
        } else {
            return res.status(401).json({ error: "Not authorized, No token" });
        }
    } catch (error) {
        next(error);
    }
};


const isAdmin = async (req, res, next) => {
    try {
        const seller = await User.findOne({email: req.body.email});
        if(!seller) throw new Error("User not found!");
        else if(seller.role != "admin") throw new Error("Not Admin, Login failed");
        next();
    } catch (error) {
        next(error)
    }
}

const checkTokenAdmin = async (req,res,next)=>{
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(401).json({ error: "Not authorized, No token" });
            }
            try {
                const { id } = verify(token, process.env.SELLER_TOKEN);
                req.user = await User.findById(id).select("_id userName");

                if (!req.user) {
                    return res.status(401).json({ error: "Not authorized, Token failed" });
                }
                next();
            } catch (err) {
                next(err);
            }
        } else {
            return res.status(401).json({ error: "Not authorized, No token" });
        }
    } catch (error) {
        next(error);
    }
}

const checkValidProduct = async(req,res,next) => {
    try {
        console.log(req.files);
        next();
    } catch (error) {
        next(error)
    }
}
module.exports = {authGuard,isAdmin,checkTokenAdmin,checkValidProduct};