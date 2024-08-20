require('dotenv').config();
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController.js');

// Authentication
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/forgot_password', authController.forgotPassword);
router.post('/reset_password/:token', authController.resetPassword);

module.exports = router;
