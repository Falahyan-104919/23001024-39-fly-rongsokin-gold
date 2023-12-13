require('dotenv').config();
const express = require('express');
const router = express.Router();
const { verifyToken } = require('./middleware/verifyCredentials');
const { storage, updateImgProcessor } = require('./middleware/imageProcessor');

const userController = require('../controllers/userController');
const uploadProfileImg = storage.profileImageStorage.single('profileImg');

// User Profile Configuration
router.get('/user', userController.getAllUserProfile);
router.get('/user/:userId', userController.getUserProfile);
router.put('/user/:userId', verifyToken, userController.updateUserProfile);
router.delete('/user/:userId', verifyToken, userController.deleteUser);
router.put(
  '/user/change_password/:userId',
  verifyToken,
  userController.updateUserPassword
);
router.post(
  '/user/become_mitra/:userId',
  verifyToken,
  userController.becomeMitra
);
router.put(
  '/user/set_profile_image/:userId',
  verifyToken,
  uploadProfileImg,
  userController.uploadProfileImg
);
router.put(
  '/user/update_profile_image/:userId',
  verifyToken,
  updateImgProcessor.deleteProfileImg,
  uploadProfileImg,
  userController.editProfileImg
);

// const imageController = require('../controllers/imageController');

// Image Routes
// router.get('/image/:userId', verifyToken, imageController.getProfileImage);
// router.get('/image/:productId', verifyToken, imageController.getProductImages);
// router.get('/image/:forumCustomerId', verifyToken, imageController.getForumCustomerImages);
// router.get('/image/:forumMitraId', verifyToken, imageController.getForumMitraImages);

// Export the router
module.exports = router;
