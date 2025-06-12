const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const auth = require('../middleware/auth'); // Assuming you have auth middleware
const admin = require('../middleware/admin'); // Assuming you have admin middleware

// @route   POST /api/inquiries
// @desc    Submit a new inquiry
// @access  Public
router.post('/', async (req, res) => {
    const { dishName, customerName, customerEmail, message } = req.body;

    try {
        const newInquiry = new Inquiry({
            dishName,
            customerName,
            customerEmail,
            message,
        });

        const inquiry = await newInquiry.save();
        res.json(inquiry);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/inquiries
// @desc    Get all inquiries (Admin only)
// @access  Private (Admin)
router.get('/', auth, admin, async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/inquiries/:id
// @desc    Update inquiry status (Admin only)
// @access  Private (Admin)
router.put('/:id', auth, admin, async (req, res) => {
    const { status } = req.body;

    try {
        let inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({ msg: 'Inquiry not found' });
        }

        inquiry.status = status;

        await inquiry.save();

        res.json(inquiry);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router; 