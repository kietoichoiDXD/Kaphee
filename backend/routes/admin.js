const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const MenuItem = require('../models/MenuItem');

// TODO: Add authentication and authorization middleware to protect these routes

// Giả lập tài khoản admin
const ADMIN_USERNAME = 'admin@vintagecafe.com';
const ADMIN_PASSWORD = '123';

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Sai tài khoản hoặc mật khẩu' });
    }
});

// Get all booking requests (for admin dashboard)
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all menu items
router.get('/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find().sort({ name: 1 }); // Sort by name
    res.status(200).json(menuItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new menu item
router.post('/menu', async (req, res) => {
  const { name, description, price, category, imageUrl, isAvailable } = req.body;

  try {
    const newItem = new MenuItem({
      name,
      description,
      price,
      category,
      imageUrl,
      isAvailable
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a menu item
router.put('/menu/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a menu item
router.delete('/menu/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 