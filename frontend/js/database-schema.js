// Database Schema Definitions

// Users Collection
const usersSchema = {
    uid: 'string', // Firebase Auth UID
    email: 'string',
    displayName: 'string',
    photoURL: 'string',
    role: 'string', // 'admin' | 'user'
    phoneNumber: 'string',
    createdAt: 'timestamp',
    lastLogin: 'timestamp',
    isActive: 'boolean',
    preferences: {
        emailNotifications: 'boolean',
        theme: 'string', // 'light' | 'dark'
        language: 'string'
    }
};

// Menu Items Collection
const menuItemsSchema = {
    id: 'string',
    name: 'string',
    description: 'string',
    price: 'number',
    category: 'string',
    imageURL: 'string',
    isAvailable: 'boolean',
    ingredients: ['string'],
    allergens: ['string'],
    nutritionalInfo: {
        calories: 'number',
        protein: 'number',
        carbs: 'number',
        fat: 'number'
    },
    createdAt: 'timestamp',
    updatedAt: 'timestamp'
};

// Categories Collection
const categoriesSchema = {
    id: 'string',
    name: 'string',
    description: 'string',
    imageURL: 'string',
    order: 'number',
    isActive: 'boolean'
};

// Bookings Collection
const bookingsSchema = {
    id: 'string',
    userId: 'string', // Reference to users collection
    date: 'timestamp',
    time: 'string',
    numberOfGuests: 'number',
    status: 'string', // 'pending' | 'confirmed' | 'cancelled' | 'completed'
    specialRequests: 'string',
    tableNumber: 'string',
    createdAt: 'timestamp',
    updatedAt: 'timestamp'
};

// Reviews Collection
const reviewsSchema = {
    id: 'string',
    userId: 'string', // Reference to users collection
    menuItemId: 'string', // Reference to menuItems collection
    rating: 'number', // 1-5
    comment: 'string',
    images: ['string'], // URLs to images
    createdAt: 'timestamp',
    updatedAt: 'timestamp',
    isVerified: 'boolean'
};

// Orders Collection
const ordersSchema = {
    id: 'string',
    userId: 'string', // Reference to users collection
    items: [{
        menuItemId: 'string',
        quantity: 'number',
        price: 'number',
        specialInstructions: 'string'
    }],
    totalAmount: 'number',
    status: 'string', // 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'
    paymentStatus: 'string', // 'pending' | 'paid' | 'failed'
    paymentMethod: 'string',
    createdAt: 'timestamp',
    updatedAt: 'timestamp'
};

// Promotions Collection
const promotionsSchema = {
    id: 'string',
    code: 'string',
    description: 'string',
    discountType: 'string', // 'percentage' | 'fixed'
    discountValue: 'number',
    startDate: 'timestamp',
    endDate: 'timestamp',
    minimumOrderAmount: 'number',
    maxUses: 'number',
    currentUses: 'number',
    isActive: 'boolean'
};

// Settings Collection
const settingsSchema = {
    id: 'string',
    key: 'string',
    value: 'any',
    description: 'string',
    updatedAt: 'timestamp',
    updatedBy: 'string' // Reference to users collection
};

// Notifications Collection
const notificationsSchema = {
    id: 'string',
    userId: 'string', // Reference to users collection
    title: 'string',
    message: 'string',
    type: 'string', // 'info' | 'success' | 'warning' | 'error'
    isRead: 'boolean',
    createdAt: 'timestamp',
    link: 'string' // Optional link to related content
};

// Export all schemas
export {
    usersSchema,
    menuItemsSchema,
    categoriesSchema,
    bookingsSchema,
    reviewsSchema,
    ordersSchema,
    promotionsSchema,
    settingsSchema,
    notificationsSchema
}; 