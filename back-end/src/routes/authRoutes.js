require('dotenv').config()
const express = require('express');
const router = express.Router();

// Authentication
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;