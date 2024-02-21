const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const mitraRoutes = require('./mitraRoutes');
const transactionRoutes = require('./transactionRoutes');
const forumMitraRoutes = require('./forumMitraRoutes');
const forumCustomerRoutes = require('./forumCustomerRoutes');
const productsRoutes = require('./productRoutes');
const adminRoutes = require('./adminRoutes');
const paymentRoutes = require('./paymentReceiptRoutes');
const deliveryRoutes = require('./deliveryReceiptRoutes');

router.use('/', authRoutes);
router.use('/', userRoutes);
router.use('/', mitraRoutes);
router.use('/', productsRoutes);
router.use('/', transactionRoutes);
router.use('/', forumMitraRoutes);
router.use('/', forumCustomerRoutes);
router.use('/', adminRoutes);
router.use('/', paymentRoutes);
router.use('/', deliveryRoutes);

module.exports = router;
