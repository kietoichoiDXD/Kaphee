const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profileImage: {
        type: String,
        default: 'assets/images/default-avatar.jpg'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
    },
    preferences: {
        emailNotifications: {
            type: Boolean,
            default: true
        },
        theme: {
            type: String,
            enum: ['light', 'dark'],
            default: 'light'
        }
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});

// Index for efficient querying
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Generate JWT token
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { userId: this._id, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token;
};

// Generate refresh token
userSchema.methods.generateRefreshToken = function() {
    const refreshToken = jwt.sign(
        { userId: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
    this.refreshToken = refreshToken;
    return refreshToken;
};

// Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;