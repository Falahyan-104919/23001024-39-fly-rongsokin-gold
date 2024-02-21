const express = require('express');
const router = express.Router();
const {
  postDeliveryReceipt,
  getDeliveryReceipt,
} = require('../controllers/deliveryReceiptController');
const { storage } = require('./middleware/imageProcessor');
const uploadDeliveryReceiptStorage =
  storage.deliveryReceiptStorage.single('delivery_receipt');

router.post(
  '/delivery_receipt',
  uploadDeliveryReceiptStorage,
  postDeliveryReceipt
);
router.get('/delivery_receipt/:transaction_id', getDeliveryReceipt);

module.exports = router;
