const express = require('express');
const router = express.Router();
const {
  postPaymentReceipt,
  getPaymentReceipt,
} = require('../controllers/paymentReceiptController');
const { storage } = require('./middleware/imageProcessor');
const uploadPaymentReceipt =
  storage.paymentReceiptStorage.single('payment_receipt');

router.get('/payment/:transaction_id', getPaymentReceipt);
router.post('/payment', uploadPaymentReceipt, postPaymentReceipt);

module.exports = router;
