require('dotenv').config()
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

const userController = require('../controllers/userController');

// User Profile Configuration
router.get('/profile/:userId', verifyToken, userController.getUserProfile);
router.put('/profile/:userId', verifyToken, userController.updateUserProfile);
router.delete('/profile/:userId', verifyToken, userController.deleteUser);
router.put('/profile/:userId/change_password', verifyToken, userController.updateUserPassword);

const forumController = require('../controllers/forumController');

// Customer Forum Routes
router.get('/forum', verifyToken, forumController.getForumCustomer);
router.post('/forum/:userId', verifyToken, forumController.postForumCustomer);
router.put('/forum/:userId', verifyToken, forumController.updateForumCustomer);


// Export the router
module.exports = router;