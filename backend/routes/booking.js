const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { sendBookingConfirmation } = require('../utils/emailService');

// Create a new booking
router.post('/', async (req, res) => {
    try {
        const {
            customerName,
            email,
            phone,
            date,
            time,
            numberOfGuests,
            tableNumber,
            specialRequests
        } = req.body;

        // Create new booking
        const booking = new Booking({
            customerName,
            email,
            phone,
            date,
            time,
            numberOfGuests,
            tableNumber,
            specialRequests,
            status: 'confirmed'
        });

        // Save booking to database
        const savedBooking = await booking.save();

        // Send confirmation email
        const emailSent = await sendBookingConfirmation(savedBooking);

        res.status(201).json({
            success: true,
            booking: savedBooking,
            emailSent
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating booking'
        });
    }
});

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ date: 1, time: 1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings' });
    }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const booking = await Booking.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking status' });
    }
});

module.exports = router; 