const express = require('express');
const router = express.Router();

// Import the user controller that contains the CRUD operations
const userController = require('../controllers/userController');

// Define routes for user management
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile/:userId', userController.getUserProfile);
router.put('/profile/:userId', userController.updateUserProfile);
router.delete('/profile/:userId', userController.deleteUser);
router.put('/profile/:userId/change_password', userController.updateUserPassword);

// Export the router
module.exports = router;