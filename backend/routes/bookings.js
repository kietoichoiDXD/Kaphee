const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
// Assuming User model is also needed if linking bookings to registered users
const User = require('../models/User'); 

// Route to submit a new booking
router.post('/', async (req, res) => {
  // TODO: Implement validation for incoming booking data
  const { fullName, email, phone, bookingDate, bookingTime, numberOfGuests, specialRequests } = req.body;

  try {
    // Optionally, find the user if they are logged in and link the booking
    // This requires sending user info (e.g., user ID or token) from the frontend.
    // For now, we'll save the provided name and email.
    let user = null;
    // If you pass a user ID or token from the frontend:
    // if (req.user && req.user.id) { // Assuming user info is attached to request after authentication
    //   user = await User.findById(req.user.id);
    // }

    const newBooking = new Booking({
      // user: user ? user._id : null, // Link booking to user if found
      fullName,
      email,
      phone,
      bookingDate: new Date(bookingDate), // Convert date string to Date object
      bookingTime,
      numberOfGuests,
      specialRequests,
      status: 'Pending' // Default status
    });

    const savedBooking = await newBooking.save();
    
    res.status(201).json({ message: 'Booking successful!', booking: savedBooking });

  } catch (error) {
    console.error(error);
    // TODO: More specific error handling (e.g., validation errors)
    res.status(500).json({ message: 'Server error' });
  }
});

// TODO: Add more booking routes (e.g., get user's bookings, cancel booking)

module.exports = router; 