const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    displayOrder: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Virtual for getting menu items in this category
categorySchema.virtual('menuItems', {
    ref: 'MenuItem',
    localField: '_id',
    foreignField: 'category'
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category; 