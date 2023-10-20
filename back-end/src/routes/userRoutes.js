require('dotenv').config()
const express = require('express');
const router = express.Router();
const {verifyToken} = require('./middleware/verifyCredentials');
const {storage, updateImgProcessor} = require('./middleware/imageProcessor');

const userController = require('../controllers/userController');

// User Profile Configuration
router.get('/user', userController.getAllUserProfile);
router.get('/user/:userId', userController.getUserProfile);
router.put('/user/:userId', verifyToken, userController.updateUserProfile);
router.delete('/user/:userId', verifyToken, userController.deleteUser);
router.put('/user/change_password/:userId', verifyToken, userController.updateUserPassword);
router.post('/user/become_mitra/:userId', verifyToken, userController.becomeMitra);

const forumCustomerController = require('../controllers/forumCustomerController');
const uploadForumCustomerImg = storage.forumCustomerImageStorage.array('forumImg', 5);

// Customer Forum Routes
router.get('/forum', verifyToken, forumCustomerController.getAllForumCustomer);
router.post('/forum/:userId', verifyToken, uploadForumCustomerImg,forumCustomerController.postForumCustomer);
router.put('/forum/:forumCustomerId', verifyToken, updateImgProcessor.deleteAllImgForumCustomer, uploadForumCustomerImg,forumCustomerController.updateForumCustomer);


// Export the router
module.exports = router;