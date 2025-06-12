const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    dishName: {
        type: String,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Replied', 'Closed'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Inquiry', inquirySchema); 