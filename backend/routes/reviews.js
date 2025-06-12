const express = require('express');
const router = express.Router();

// Get all reviews
router.get('/', (req, res) => {
    res.json({ message: 'Reviews route working' });
});

// Add a new review
router.post('/', (req, res) => {
    res.json({ message: 'Review added successfully' });
});

module.exports = router; 