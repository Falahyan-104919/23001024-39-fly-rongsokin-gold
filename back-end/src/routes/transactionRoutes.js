require('dotenv').config();
const express = require('express');
const router = express.Router();
const { verifyToken } = require('./middleware/verifyCredentials');
const { storage, updateImgProcessor } = require('./middleware/imageProcessor');

const transactionController = require('../controllers/transactionController');

// Mitra Transaction Routes
router.get(
  '/transaction_list/:mitraId',
  verifyToken,
  transactionController.getMitraOrderTransaction
);
router.put(
  '/update_status_transaction/:transactionId',
  verifyToken,
  transactionController.updateStatusTransaction
);
router.put(
  '/process_order/:transactionId',
  verifyToken,
  transactionController.processOrder
);

// Transaction Routes
router.get('/order/:transactionId', transactionController.getTransaction);
router.get(
  '/order_list/:userId',
  verifyToken,
  transactionController.getCustomerTransaction
);
router.post(
  '/order/:userId',
  verifyToken,
  transactionController.postTransaction
);
router.put(
  '/order/arrived/:transactionId',
  verifyToken,
  transactionController.updateStatusTransaction
);

module.exports = router;
