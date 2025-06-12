const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  image: {
    type: String,
    required: true
  },
  ingredients: [{
    type: String,
    trim: true
  }],
  dietaryInfo: {
    isVegetarian: {
      type: Boolean,
      default: false
    },
    isVegan: {
      type: Boolean,
      default: false
    },
    isGlutenFree: {
      type: Boolean,
      default: false
    }
  },
  preparationTime: {
    type: Number, // in minutes
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  numberOfRatings: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Virtual for average rating
MenuItemSchema.virtual('averageRating').get(function() {
  return this.numberOfRatings > 0 ? this.rating / this.numberOfRatings : 0;
});

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);

module.exports = MenuItem; 