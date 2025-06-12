// backend/routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET /api/reviews
// @desc    Get all reviews
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { menuItem, rating, limit = 10, page = 1 } = req.query;
        let query = { isVisible: true };

        if (menuItem) {
            query.menuItem = menuItem;
        }

        if (rating) {
            query.rating = rating;
        }

        const reviews = await Review.find(query)
            .populate('customer', 'fullName profileImage')
            .populate('menuItem', 'name image')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Review.countDocuments(query);

        res.json({
            reviews,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error('Get reviews error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   POST /api/reviews
// @desc    Create review
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { menuItem, order, rating, title, comment, images } = req.body;

        // Check if user already reviewed this item/order
        let existingReview;
        if (order) {
            existingReview = await Review.findOne({ 
                customer: req.user.id, 
                order: order 
            });
        } else if (menuItem) {
            existingReview = await Review.findOne({ 
                customer: req.user.id, 
                menuItem: menuItem 
            });
        }

        if (existingReview) {
            return res.status(400).json({ msg: 'You have already reviewed this item' });
        }

        const review = new Review({
            customer: req.user.id,
            menuItem,
            order,
            rating,
            title,
            comment,
            images: images || []
        });

        await review.save();

        const populatedReview = await Review.findById(review._id)
            .populate('customer', 'fullName profileImage')
            .populate('menuItem', 'name image');

        res.status(201).json(populatedReview);
    } catch (error) {
        console.error('Create review error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   PUT /api/reviews/:id/helpful
// @desc    Mark review as helpful
// @access  Private
router.put('/:id/helpful', auth, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        
        if (!review) {
            return res.status(404).json({ msg: 'Review not found' });
        }

        // Check if user already marked as helpful
        const alreadyMarked = review.helpfulVotes.some(
            vote => vote.user.toString() === req.user.id
        );

        if (alreadyMarked) {
            // Remove helpful vote
            review.helpfulVotes = review.helpfulVotes.filter(
                vote => vote.user.toString() !== req.user.id
            );
        } else {
            // Add helpful vote
            review.helpfulVotes.push({ user: req.user.id });
        }

        await review.save();
        res.json({ helpfulCount: review.helpfulVotes.length });
    } catch (error) {
        console.error('Mark review helpful error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;