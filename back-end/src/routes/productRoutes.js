require('dotenv').config();
const express = require('express');
const router = express.Router();
const { storage, updateImgProcessor } = require('./middleware/imageProcessor');

const productMitraController = require('../controllers/productController');
const uploadsProductImg = storage.productsImageStorage.single('productImg');

// Mitra Product Routes
router.get('/products', productMitraController.getAllProduct);
router.get('/search_products', productMitraController.getProductByName);
router.post(
  '/products/upload/:mitraId',
  uploadsProductImg,
  productMitraController.postProduct
);
router.get('/product/:productId', productMitraController.getProduct);
router.put(
  '/products/update/:productId',
  uploadsProductImg,
  productMitraController.updateProduct
);

router.get('/mitra_products/:mitraId', productMitraController.getMitraProducts);

module.exports = router;
