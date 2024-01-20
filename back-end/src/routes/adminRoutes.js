const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/admin/card_stats', adminController.getCardStats);
router.get('/admin/summary_table', adminController.getSummaryTable);
router.get('/admin/products', adminController.getProducts);
router.get('/admin/forum_customer', adminController.getForumCustomer);
router.get('/admin/forum_mitra', adminController.getForumMitra);
router.put('/admin/turn_to_superuser/:userId', adminController.turnToSuperuser);
router.put('/admin/deactivate_user/:userId', adminController.deactivateUser);
router.put(
  '/admin/deactivate_product/:productId',
  adminController.deactivateProduct
);
router.put(
  '/admin/deactivate_forum_customer/:forumId',
  adminController.deactivateForumCustomer
);
router.put(
  '/admin/deactivate_forum_mitra/:forumId',
  adminController.deactivateForumMitra
);

module.exports = router;
