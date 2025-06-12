const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
    register,
    login,
    refreshToken,
    logout,
    getCurrentUser
} = require('../controllers/authController');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

// Protected routes
router.post('/logout', auth, logout);
router.get('/me', auth, getCurrentUser);

module.exports = router; 