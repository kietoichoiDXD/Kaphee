const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    numberOfGuests: {
        type: Number,
        required: true,
        min: 1,
        max: 20
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    specialRequests: {
        type: String,
        trim: true
    },
    tableNumber: {
        type: Number
    },
    contactPhone: {
        type: String,
        required: true
    },
    contactName: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // in minutes
        default: 120 // default 2 hours
    }
}, {
    timestamps: true
});

// Index for efficient querying of bookings by date
bookingSchema.index({ date: 1 });

// Method to check if booking time slot is available
bookingSchema.statics.isTimeSlotAvailable = async function(date, time, numberOfGuests) {
    const existingBooking = await this.findOne({
        date,
        time,
        status: { $in: ['pending', 'confirmed'] }
    });
    return !existingBooking;
};

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking; 