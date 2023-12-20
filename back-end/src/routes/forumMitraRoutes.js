require('dotenv').config();
const express = require('express');
const router = express.Router();
const { verifyToken } = require('./middleware/verifyCredentials');
const { storage, updateImgProcessor } = require('./middleware/imageProcessor');

const forumMitraController = require('../controllers/forumMitraController');
const uploadsForumMitraImg =
  storage.forumMitraImageStorage.single('forumMitraImg');

// Mitra Forum Routes
router.get('/forum_mitra', forumMitraController.getAllForumMitra);
router.get(
  '/mitra/forum/:forumMitraId',
  verifyToken,
  forumMitraController.getForumMitra
);
router.get(
  `/mitra/forum_activity/:mitraId`,
  verifyToken,
  forumMitraController.getMitraForumActivity
);
router.post(
  '/mitra/forum/:mitraId',
  uploadsForumMitraImg,
  forumMitraController.postForumMitra
);
router.put(
  '/mitra/forum/:forumMitraId',
  verifyToken,
  uploadsForumMitraImg,
  forumMitraController.updateForumMitra
);

module.exports = router;
