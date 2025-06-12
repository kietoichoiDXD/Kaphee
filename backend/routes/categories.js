// backend/routes/categories.js
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true })
            .sort({ displayOrder: 1, name: 1 });
        res.json(categories);
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   GET /api/categories/:id
// @desc    Get single category
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        console.error('Get category error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   POST /api/categories
// @desc    Create category (Admin only)
// @access  Private
router.post('/', auth, admin, async (req, res) => {
    try {
        const { name, description, image, displayOrder } = req.body;

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ msg: 'Category already exists' });
        }

        const category = new Category({
            name,
            description,
            image,
            displayOrder: displayOrder || 0
        });

        await category.save();
        res.status(201).json(category);
    } catch (error) {
        console.error('Create category error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   PUT /api/categories/:id
// @desc    Update category (Admin only)
// @access  Private
router.put('/:id', auth, admin, async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        res.json(category);
    } catch (error) {
        console.error('Update category error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   DELETE /api/categories/:id
// @desc    Delete category (Admin only)
// @access  Private
router.delete('/:id', auth, admin, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        // Check if category has menu items
        const MenuItem = require('../models/MenuItem');
        const menuItemsCount = await MenuItem.countDocuments({ category: req.params.id });
        
        if (menuItemsCount > 0) {
            return res.status(400).json({ 
                msg: 'Cannot delete category with existing menu items. Please reassign or delete menu items first.' 
            });
        }

        await Category.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Category deleted successfully' });
    } catch (error) {
        console.error('Delete category error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;