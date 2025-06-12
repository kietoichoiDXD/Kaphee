const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const Category = require('../models/Category');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET /api/menu
// @desc    Get all menu items
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = { isAvailable: true };

        if (category && category !== 'all') {
            query.category = category;
        }

        if (search) {
            query.$text = { $search: search };
        }

        const menuItems = await MenuItem.find(query)
            .populate('category', 'name')
            .sort({ displayOrder: 1, name: 1 });

        res.json(menuItems);
    } catch (error) {
        console.error('Get menu error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   GET /api/menu/:id
// @desc    Get single menu item
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id)
            .populate('category', 'name description');

        if (!menuItem) {
            return res.status(404).json({ msg: 'Menu item not found' });
        }

        res.json(menuItem);
    } catch (error) {
        console.error('Get menu item error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   POST /api/menu
// @desc    Create menu item (Admin only)
// @access  Private
router.post('/', auth, admin, async (req, res) => {
    try {
        const menuItem = new MenuItem(req.body);
        await menuItem.save();
        
        const populatedItem = await MenuItem.findById(menuItem._id)
            .populate('category', 'name');
        
        res.status(201).json(populatedItem);
    } catch (error) {
        console.error('Create menu item error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   PUT /api/menu/:id
// @desc    Update menu item (Admin only)
// @access  Private
router.put('/:id', auth, admin, async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('category', 'name');

        if (!menuItem) {
            return res.status(404).json({ msg: 'Menu item not found' });
        }

        res.json(menuItem);
    } catch (error) {
        console.error('Update menu item error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   DELETE /api/menu/:id
// @desc    Delete menu item (Admin only)
// @access  Private
router.delete('/:id', auth, admin, async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

        if (!menuItem) {
            return res.status(404).json({ msg: 'Menu item not found' });
        }

        res.json({ msg: 'Menu item deleted successfully' });
    } catch (error) {
        console.error('Delete menu item error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;