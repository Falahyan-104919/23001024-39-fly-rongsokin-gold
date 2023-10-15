require('dotenv').config();
const express = require('express');
const router = express.Router();
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
        console.error("Error during token verification", error)
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

}

const forumController = require('../controllers/forumController');


// Mitra Forum Routes
router.get('/mitra/forum', verifyToken, forumController.getForumMitra);
router.post('/mitra/forum/:userId', verifyToken, forumController.postForumMitra);
router.put('/mitra/forum/:userId', verifyToken, forumController.updateForumMitra);

module.exports = router;