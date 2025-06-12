// backend/models/Category.js
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
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    displayOrder: {
        type: Number,
        default: 0
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    }
}, {
    timestamps: true
});

// Auto-generate slug before saving
categorySchema.pre('save', function(next) {
    if (this.isModified('name')) {
        this.slug = this.name.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }
    next();
});

// Index for efficient querying
categorySchema.index({ name: 1 });
categorySchema.index({ slug: 1 });
categorySchema.index({ displayOrder: 1 });

module.exports = mongoose.model('Category', categorySchema);