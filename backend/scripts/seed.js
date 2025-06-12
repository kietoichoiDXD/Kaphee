require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Category = require('../models/Category');
const MenuItem = require('../models/MenuItem');

const connectDB = async () => {
    try {
        // Use the existing database name
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/Vintage_Coffee';
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected for seeding');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const seedDatabase = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Category.deleteMany({});
        await MenuItem.deleteMany({});

        console.log('Cleared existing data');

        // Create admin user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123', salt);

        const adminUser = new User({
            username: 'admin',
            email: 'admin@vintagecafe.com',
            password: hashedPassword,
            fullName: 'Admin User',
            role: 'admin'
        });

        await adminUser.save();
        console.log('Admin user created');

        // Create categories
        const categories = [
            {
                name: 'Coffee',
                description: 'Premium coffee selections',
                image: 'assets/images/categories/coffee.jpg',
                displayOrder: 1
            },
            {
                name: 'Tea',
                description: 'Fine tea varieties',
                image: 'assets/images/categories/tea.jpg',
                displayOrder: 2
            },
            {
                name: 'Pastries',
                description: 'Fresh baked goods',
                image: 'assets/images/categories/pastries.jpg',
                displayOrder: 3
            },
            {
                name: 'Desserts',
                description: 'Sweet treats',
                image: 'assets/images/categories/desserts.jpg',
                displayOrder: 4
            }
        ];

        const createdCategories = await Category.insertMany(categories);
        console.log('Categories created');

        // Create menu items
        const coffeeCategory = createdCategories.find(cat => cat.name === 'Coffee')._id;
        const teaCategory = createdCategories.find(cat => cat.name === 'Tea')._id;
        const pastriesCategory = createdCategories.find(cat => cat.name === 'Pastries')._id;
        const dessertsCategory = createdCategories.find(cat => cat.name === 'Desserts')._id;

        const menuItems = [
            // Coffee
            {
                name: 'Espresso',
                description: 'Rich and bold Italian espresso',
                price: 3.50,
                category: coffeeCategory,
                image: 'assets/images/menu/espresso.jpg',
                isAvailable: true,
                stock: 50,
                preparationTime: 3
            },
            {
                name: 'Cappuccino',
                description: 'Espresso with steamed milk and foam',
                price: 4.25,
                category: coffeeCategory,
                image: 'assets/images/menu/cappuccino.jpg',
                isAvailable: true,
                stock: 45,
                preparationTime: 5
            },
            {
                name: 'Vienna Coffee',
                description: 'Coffee with whipped cream',
                price: 4.75,
                category: coffeeCategory,
                image: 'assets/images/menu/vienna.jpg',
                isAvailable: true,
                stock: 30,
                preparationTime: 6
            },
            // Tea
            {
                name: 'Earl Grey',
                description: 'Classic British tea with bergamot',
                price: 3.25,
                category: teaCategory,
                image: 'assets/images/menu/earl-grey.jpg',
                isAvailable: true,
                stock: 40,
                preparationTime: 4
            },
            {
                name: 'Chamomile Tea',
                description: 'Relaxing herbal tea',
                price: 3.00,
                category: teaCategory,
                image: 'assets/images/menu/chamomile.jpg',
                isAvailable: true,
                stock: 35,
                preparationTime: 5
            },
            // Pastries
            {
                name: 'Croissant',
                description: 'Buttery French pastry',
                price: 2.75,
                category: pastriesCategory,
                image: 'assets/images/menu/croissant.jpg',
                isAvailable: true,
                stock: 25,
                preparationTime: 2
            },
            {
                name: 'Pain au Chocolat',
                description: 'Chocolate-filled pastry',
                price: 3.25,
                category: pastriesCategory,
                image: 'assets/images/menu/pain-au-chocolat.jpg',
                isAvailable: true,
                stock: 20,
                preparationTime: 2
            },
            // Desserts
            {
                name: 'Tiramisu',
                description: 'Classic Italian dessert',
                price: 5.50,
                category: dessertsCategory,
                image: 'assets/images/menu/tiramisu.jpg',
                isAvailable: true,
                stock: 15,
                preparationTime: 3
            }
        ];

        await MenuItem.insertMany(menuItems);
        console.log('Menu items created');

        console.log('Database seeded successfully!');
        console.log('Admin credentials:');
        console.log('Email: admin@vintagecafe.com');
        console.log('Password: 123');

    } catch (error) {
        console.error('Seeding error:', error);
    } finally {
        mongoose.connection.close();
    }
};

const runSeed = async () => {
    await connectDB();
    await seedDatabase();
};

runSeed();