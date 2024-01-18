const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/admin/card_stats', adminController.getCardStats);
router.get('/admin/summary_table', adminController.getSummaryTable);
router.delete('/admin/deactivate_user/:userId', adminController.deactivateUser);
router.delete(
  '/admin/deactivate_product/:productId',
  adminController.deactivateProduct
);
router.delete(
  '/admin/deactivate_forum/:forumId',
  adminController.deactivateForum
);

module.exports = router;
