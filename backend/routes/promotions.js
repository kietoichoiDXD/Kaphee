// backend/routes/promotions.js
const express = require('express');
const router = express.Router();
const Promotion = require('../models/Promotion');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET /api/promotions
// @desc    Get active promotions
// @access  Public
router.get('/', async (req, res) => {
    try {
        const now = new Date();
        const promotions = await Promotion.find({
            isActive: true,
            startDate: { $lte: now },
            endDate: { $gte: now },
            $or: [
                { usageLimit: null },
                { $expr: { $lt: ['$usageCount', '$usageLimit'] } }
            ]
        })
        .populate('applicableCategories', 'name')
        .populate('applicableItems', 'name image price')
        .sort({ createdAt: -1 });

        res.json(promotions);
    } catch (error) {
        console.error('Get promotions error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   POST /api/promotions/validate
// @desc    Validate promotion code
// @access  Private
router.post('/validate', auth, async (req, res) => {
    try {
        const { code, orderItems, orderTotal } = req.body;
        
        const promotion = await Promotion.findOne({ code: code.toUpperCase() })
            .populate('applicableCategories applicableItems');

        if (!promotion) {
            return res.status(404).json({ msg: 'Invalid promotion code' });
        }

        // Check if promotion is active and within date range
        const now = new Date();
        if (!promotion.isActive || promotion.startDate > now || promotion.endDate < now) {
            return res.status(400).json({ msg: 'Promotion is not active' });
        }

        // Check usage limits
        if (promotion.usageLimit && promotion.usageCount >= promotion.usageLimit) {
            return res.status(400).json({ msg: 'Promotion usage limit reached' });
        }

        // Check user usage limit
        const userUsageCount = promotion.usedBy.filter(
            usage => usage.user.toString() === req.user.id
        ).length;

        if (userUsageCount >= promotion.userUsageLimit) {
            return res.status(400).json({ msg: 'You have reached the usage limit for this promotion' });
        }

        // Check minimum order amount
        if (orderTotal < promotion.minimumOrderAmount) {
            return res.status(400).json({ 
                msg: `Minimum order amount is $${promotion.minimumOrderAmount}` 
            });
        }

        // Calculate discount
        let discount = 0;
        if (promotion.type === 'percentage') {
            discount = (orderTotal * promotion.value) / 100;
            if (promotion.maxDiscountAmount) {
                discount = Math.min(discount, promotion.maxDiscountAmount);
            }
        } else if (promotion.type === 'fixed_amount') {
            discount = promotion.value;
        }

        res.json({
            valid: true,
            promotion: {
                id: promotion._id,
                code: promotion.code,
                name: promotion.name,
                type: promotion.type,
                value: promotion.value
            },
            discount: Math.min(discount, orderTotal)
        });
    } catch (error) {
        console.error('Validate promotion error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   POST /api/promotions
// @desc    Create promotion (Admin only)
// @access  Private
router.post('/', auth, admin, async (req, res) => {
    try {
        const promotion = new Promotion(req.body);
        await promotion.save();
        
        const populatedPromotion = await Promotion.findById(promotion._id)
            .populate('applicableCategories applicableItems');
        
        res.status(201).json(populatedPromotion);
    } catch (error) {
        console.error('Create promotion error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;