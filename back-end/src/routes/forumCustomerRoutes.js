require('dotenv').config();
const express = require('express');
const router = express.Router();
const { verifyToken } = require('./middleware/verifyCredentials');
const { storage, updateImgProcessor } = require('./middleware/imageProcessor');

const forumCustomerController = require('../controllers/forumCustomerController');
const uploadForumCustomerImg =
  storage.forumCustomerImageStorage.single('forumImage');

// Customer Forum Routes
router.get('/forum', forumCustomerController.getAllForumCustomer);
router.get(
  '/forum/:forumCustomerId',
  verifyToken,
  forumCustomerController.getForumCustomer
);
router.post(
  '/forum/:userId',
  verifyToken,
  uploadForumCustomerImg,
  forumCustomerController.postForumCustomer
);
router.put(
  '/forum/:forumCustomerId',
  verifyToken,
  updateImgProcessor.deleteAllImgForumCustomer,
  uploadForumCustomerImg,
  forumCustomerController.updateForumCustomer
);
router.delete(
  '/forum/:forumCustomerId',
  verifyToken,
  forumCustomerController.deleteForumCustomer
);
router.get(
  '/forum_activity/:userId',
  verifyToken,
  forumCustomerController.getUserForumActivity
);

module.exports = router;
