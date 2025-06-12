// backend/scripts/mongo-operations.js
require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');  // Sửa từ '../backend/models/Category'
const MenuItem = require('../models/MenuItem');  // Sửa từ '../backend/models/MenuItem'
const User = require('../models/User');          // Sửa từ '../backend/models/User'

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/Vintage_Coffee');
    console.log('Connected to MongoDB');
};

// Các hàm thao tác
const mongoOperations = {
    // Lấy tất cả categories
    async getAllCategories() {
        return await Category.find().sort({ displayOrder: 1 });
    },

    // Thêm category mới
    async addCategory(data) {
        const category = new Category(data);
        return await category.save();
    },

    // Cập nhật category
    async updateCategory(id, data) {
        return await Category.findByIdAndUpdate(id, data, { new: true });
    },

    // Xóa category
    async deleteCategory(id) {
        // Kiểm tra có menu items không
        const menuItemsCount = await MenuItem.countDocuments({ category: id });
        if (menuItemsCount > 0) {
            throw new Error('Cannot delete category with existing menu items');
        }
        return await Category.findByIdAndDelete(id);
    },

    // Tìm menu items theo category
    async getMenuItemsByCategory(categoryId) {
        return await MenuItem.find({ category: categoryId })
            .populate('category', 'name');
    },

    // Thống kê
    async getCategoryStats() {
        return await MenuItem.aggregate([
            {
                $group: {
                    _id: '$category',
                    totalItems: { $sum: 1 },
                    avgPrice: { $avg: '$price' },
                    totalStock