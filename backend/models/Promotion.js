// backend/models/Promotion.js
const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
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
    type: {
        type: String,
        enum: ['percentage', 'fixed_amount', 'free_item'],
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    minimumOrderAmount: {
        type: Number,
        default: 0
    },
    maxDiscountAmount: {
        type: Number
    },
    applicableCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    applicableItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem'
    }],
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    usageLimit: {
        type: Number,
        default: null // null = unlimited
    },
    usageCount: {
        type: Number,
        default: 0
    },
    userUsageLimit: {
        type: Number,
        default: 1 // per user
    },
    isActive: {
        type: Boolean,
        default: true
    },
    usedBy: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        usedAt: {
            type: Date,
            default: Date.now
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    }]
}, {
    timestamps: true
});

// Index for efficient querying
promotionSchema.index({ code: 1 });
promotionSchema.index({ startDate: 1, endDate: 1 });
promotionSchema.index({ isActive: 1 });

module.exports = mongoose.model('Promotion', promotionSchema);