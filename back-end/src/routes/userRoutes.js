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
router.get('/user', verifyToken, userController.getAllUserProfile);
router.get('/user/:userId', verifyToken, userController.getUserProfile);
router.put('/user/:userId', verifyToken, userController.updateUserProfile);
router.delete('/user/:userId', verifyToken, userController.deleteUser);
router.put('/user/:userId/change_password', verifyToken, userController.updateUserPassword);
router.post('/user/become_mitra/:userId', verifyToken, userController.becomeMitra);

const forumCustomerController = require('../controllers/forumCustomerController');

// Customer Forum Routes
router.get('/forum', verifyToken, forumCustomerController.getForumCustomer);
router.post('/forum/:userId', verifyToken, forumCustomerController.postForumCustomer);
router.put('/forum/:userId', verifyToken, forumCustomerController.updateForumCustomer);


// Export the router
module.exports = router;