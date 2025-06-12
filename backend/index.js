require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, '../')));

// Database connection - Use existing database name
const connectDB = async () => {
    try {
        // Use the existing database name (case-sensitive)
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/Vintage_Coffee';
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/bookings', require('./routes/booking'));
app.use('/api/inquiries', require('./routes/inquiries'));
app.use('/api/menu', require('./routes/menu'));
// backend/index.js - Add these lines after existing routes
app.use('/api/categories', require('./routes/categories'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/promotions', require('./routes/promotions'));
// Serve frontend files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Handle all other routes by serving the main page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ msg: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Frontend available at: http://localhost:${PORT}`);
    console.log(`Backend API available at: http://localhost:${PORT}/api`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
        app.listen(PORT + 1, () => {
            console.log(`Server running on port ${PORT + 1}`);
            console.log(`Frontend available at: http://localhost:${PORT + 1}`);
            console.log(`Backend API available at: http://localhost:${PORT + 1}/api`);
        });
    } else {
        console.error('Server error:', err);
    }
});