const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/admin/card_stats', adminController.getCardStats);
router.get('/admin/summary_table', adminController.getSummaryTable);
router.get('/admin/products', adminController.getProducts);
router.put('/admin/turn_to_superuser/:userId', adminController.turnToSuperuser);
router.put('/admin/deactivate_user/:userId', adminController.deactivateUser);
router.put(
  '/admin/deactivate_product/:productId',
  adminController.deactivateProduct
);
router.delete(
  '/admin/deactivate_forum/:forumId',
  adminController.deactivateForum
);

module.exports = router;
