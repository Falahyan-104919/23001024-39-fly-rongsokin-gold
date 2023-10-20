require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {verifyTokenAndRole} = require('./middleware/verifyCredentials');
const { storage, updateImgProcessor } = require('./middleware/imageProcessor');


const forumMitraController = require('../controllers/forumMitraController');
const imgForumMitraHandler = multer({storage: storage.forumMitraImageStorage});
const uploadsForumMitraImg = imgForumMitraHandler.array('forumMitraImg', 5);

// Mitra Forum Routes
router.get('/mitra/forum', verifyTokenAndRole, forumMitraController.getForumMitra);
router.post('/mitra/forum/:userId', uploadsForumMitraImg, forumMitraController.postForumMitra);
router.put('/mitra/forum/:userId', verifyTokenAndRole, forumMitraController.updateForumMitra);
/* ===================================================================================*/


const productMitraController = require('../controllers/productController');
const uploadsProductImg = storage.productsImageStorage.array('productImg',5)

// Mitra Product Routes
router.get('/mitra/products', productMitraController.getAllProduct);
router.post('/mitra/products/upload/:mitraId', uploadsProductImg, productMitraController.postProduct);
router.get('/mitra/products/:productId', verifyTokenAndRole, productMitraController.getProduct);
router.put('/mitra/products/update/:productId', updateImgProcessor.deleteAllProductImg, uploadsProductImg, productMitraController.updateProduct);



module.exports = router;