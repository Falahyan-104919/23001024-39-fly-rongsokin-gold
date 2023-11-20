require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  verifyTokenAndRole,
  verifyToken,
} = require('./middleware/verifyCredentials');
const { storage, updateImgProcessor } = require('./middleware/imageProcessor');

// router.use((req, res, next) => {
//   console.log(req.url);
//   next();
// });

const profileMitraController = require('../controllers/mitraController');

// Mitra Profile Routes
router.get('/mitra/:mitraId', profileMitraController.getMitraProfile);
router.get(
  '/user_mitra/:userId',
  profileMitraController.getMitraProfileWithUserId
);
router.post(
  '/mitra/:mitraId',
  verifyToken,
  profileMitraController.updateProfileMitra
);

const forumMitraController = require('../controllers/forumMitraController');
const uploadsForumMitraImg = storage.forumMitraImageStorage.array(
  'forumMitraImg',
  5
);

// Mitra Forum Routes
router.get('/forum_mitra', forumMitraController.getAllForumMitra);
router.get(
  '/mitra/forum/:forumMitraId',
  verifyTokenAndRole,
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
  verifyTokenAndRole,
  uploadsForumMitraImg,
  forumMitraController.updateForumMitra
);
/* ===================================================================================*/

const productMitraController = require('../controllers/productController');
const uploadsProductImg = storage.productsImageStorage.array('productImg', 5);

// Mitra Product Routes
router.get('/products', productMitraController.getAllProduct);
router.get('/search_products', productMitraController.getProductByName);
router.post(
  '/mitra/products/upload/:mitraId',
  uploadsProductImg,
  productMitraController.postProduct
);
router.get('/product/:productId', productMitraController.getProduct);
router.put(
  '/mitra/products/update/:productId',
  uploadsProductImg,
  productMitraController.updateProduct
);

router.get(
  '/mitra/products/mitra_products/:mitraId',
  productMitraController.getMitraProducts
);

const transactionController = require('../controllers/transactionController');
// Mitra Transaction Routes
router.get(
  '/mitra/transaction_list/:mitraId',
  verifyToken,
  transactionController.getMitraOrderTransaction
);
router.put(
  '/mitra/update_status_transaction/:transactionId',
  verifyToken,
  transactionController.updateStatusTransaction
);
router.put(
  '/mitra/process_order/:transactionId',
  verifyToken,
  transactionController.processOrder
);

module.exports = router;
