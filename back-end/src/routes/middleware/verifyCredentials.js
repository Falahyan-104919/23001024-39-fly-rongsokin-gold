require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const token = req.headers.authorization

    if(!token){
        return res.status(403).json({
            message: "Token not Provided"
        })
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decode;
        next();
    }catch(error){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}

const verifyTokenAndRole = (req, res, next) => {
    const token = req.headers.authorization;
    const role = req.headers.role;

    if(!token){
        return res.status(403).json({
            message: "Token not Provided"
        })
    }

    if(role != 'mitra'){
        return res.status(401).json({
            message: "Access Denied"
        });
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next()
    }catch(err){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}

module.exports = {verifyToken, verifyTokenAndRole};