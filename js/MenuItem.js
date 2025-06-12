const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    ingredients: [{
        type: String,
        trim: true
    }],
    allergens: [{
        type: String,
        trim: true
    }],
    nutritionalInfo: {
        calories: Number,
        fat: Number,
        carbs: Number,
        protein: Number
    },
    preparationTime: {
        type: Number, // in minutes
        default: 5
    },
    stock: {
        type: Number,
        default: 0
    },
    displayOrder: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Virtual for category name
menuItemSchema.virtual('categoryName', {
    ref: 'Category',
    localField: 'category',
    foreignField: '_id',
    justOne: true
});

// Index for efficient querying
menuItemSchema.index({ category: 1, isAvailable: 1 });
menuItemSchema.index({ name: 'text', description: 'text' });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;