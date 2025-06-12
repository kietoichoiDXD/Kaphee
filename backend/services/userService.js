// backend/services/userService.js
const User = require('../models/User');

class UserService {
    // Tạo user mới
    static async createUser(userData) {
        try {
            const user = new User(userData);
            await user.save();
            
            console.log('✅ User created:', user.email);
            return user;
        } catch (error) {
            console.error('❌ Error creating user:', error);
            throw error;
        }
    }
    
    // Lấy user theo ID
    static async getUserById(userId) {
        try {
            const user = await User.findById(userId).select('-password');
            
            if (!user) {
                throw new Error('User not found');
            }
            
            console.log('📤 User retrieved:', user.email);
            return user;
        } catch (error) {
            console.error('❌ Error getting user:', error);
            throw error;
        }
    }
    
    // Cập nhật user
    static async updateUser(userId, updateData) {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                updateData,
                { new: true, runValidators: true }
            ).select('-password');
            
            if (!user) {
                throw new Error('User not found');
            }
            
            console.log('✅ User updated:', user.email);
            return user;
        } catch (error) {
            console.error('❌ Error updating user:', error);
            throw error;
        }
    }
    
    // Xóa user
    static async deleteUser(userId) {
        try {
            const user = await User.findByIdAndDelete(userId);
            
            if (!user) {
                throw new Error('User not found');
            }
            
            console.log('🗑️ User deleted:', user.email);
            return user;
        } catch (error) {
            console.error('❌ Error deleting user:', error);
            throw error;
        }
    }
    
    // Tìm kiếm users
    static async searchUsers(searchParams) {
        try {
            const { query, role, isActive, page = 1, limit = 10 } = searchParams;
            
            let searchQuery = {};
            
            if (query) {
                searchQuery.$or = [
                    { fullName: { $regex: query, $options: 'i' } },
                    { email: { $regex: query, $options: 'i' } },
                    { username: { $regex: query, $options: 'i' } }
                ];
            }
            
            if (role) {
                searchQuery.role = role;
            }
            
            if (isActive !== undefined) {
                searchQuery.isActive = isActive;
            }
            
            const users = await User.find(searchQuery)
                .select('-password')
                .sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit);
            
            const total = await User.countDocuments(searchQuery);
            
            console.log(`📊 Found ${users.length} users`);
            
            return {
                users,
                total,
                totalPages: Math.ceil(total / limit),
                currentPage: page
            };
        } catch (error) {
            console.error('❌ Error searching users:', error);
            throw error;
        }
    }
}

module.exports = UserService;