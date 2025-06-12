// DOM Elements
const sidebarNav = document.querySelector('.sidebar-nav');
const sections = document.querySelectorAll('.dashboard-section');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.querySelector('.modal-body');
const closeBtn = document.querySelector('.close-btn');
const logoutBtn = document.getElementById('logoutBtn');

// Sample Data (Replace with actual API calls)
const sampleData = {
    members: [
        { name: 'John Doe', role: 'Manager', email: 'john@vintagecoffee.com', status: 'Active' },
        { name: 'Jane Smith', role: 'Barista', email: 'jane@vintagecoffee.com', status: 'Active' },
        { name: 'Mike Johnson', role: 'Chef', email: 'mike@vintagecoffee.com', status: 'Inactive' }
    ],
    menuItems: [
        { name: 'Espresso', category: 'Coffee', price: 3.50, stock: 100, status: 'In Stock' },
        { name: 'Cappuccino', category: 'Coffee', price: 4.50, stock: 0, status: 'Out of Stock' },
        { name: 'Croissant', category: 'Pastries', price: 2.50, stock: 15, status: 'Low Stock' }
    ],
    sales: [
        { date: '2024-03-01', item: 'Espresso', quantity: 25, revenue: 87.50, profit: 43.75 },
        { date: '2024-03-01', item: 'Cappuccino', quantity: 15, revenue: 67.50, profit: 33.75 },
        { date: '2024-03-01', item: 'Croissant', quantity: 20, revenue: 50.00, profit: 25.00 }
    ],
    inventory: [
        { name: 'Coffee Beans', category: 'Raw Materials', currentStock: 50, reorderLevel: 20, lastRestocked: '2024-02-15' },
        { name: 'Milk', category: 'Dairy', currentStock: 15, reorderLevel: 30, lastRestocked: '2024-03-01' },
        { name: 'Sugar', category: 'Raw Materials', currentStock: 100, reorderLevel: 25, lastRestocked: '2024-02-20' }
    ]
};

// Navigation
sidebarNav.addEventListener('click', (e) => {
    const navItem = e.target.closest('li');
    if (!navItem) return;

    // Update active state
    document.querySelector('.sidebar-nav li.active').classList.remove('active');
    navItem.classList.add('active');

    // Show corresponding section
    const sectionId = navItem.dataset.section;
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
            loadSectionData(sectionId);
        }
    });
});

// Load Section Data
function loadSectionData(sectionId) {
    switch (sectionId) {
        case 'overview':
            loadOverviewData();
            break;
        case 'members':
            loadMembersData();
            break;
        case 'menu':
            loadMenuData();
            break;
        case 'sales':
            loadSalesData();
            break;
        case 'inventory':
            loadInventoryData();
            break;
    }
}

// Overview Section
function loadOverviewData() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Monthly Revenue',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                borderColor: '#805ad5',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });

    // Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'doughnut',
        data: {
            labels: ['Coffee', 'Tea', 'Pastries', 'Other'],
            datasets: [{
                data: [45, 25, 20, 10],
                backgroundColor: ['#805ad5', '#48bb78', '#ed8936', '#e53e3e']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}

// Members Section
function loadMembersData() {
    const tbody = document.getElementById('membersTableBody');
    tbody.innerHTML = sampleData.members.map(member => `
        <tr>
            <td>${member.name}</td>
            <td>${member.role}</td>
            <td>${member.email}</td>
            <td><span class="status-badge ${member.status.toLowerCase()}">${member.status}</span></td>
            <td>
                <button class="action-btn edit" data-id="${member.name}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" data-id="${member.name}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Menu Section
function loadMenuData() {
    const tbody = document.getElementById('menuTableBody');
    tbody.innerHTML = sampleData.menuItems.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.stock}</td>
            <td><span class="status-badge ${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span></td>
            <td>
                <button class="action-btn edit" data-id="${item.name}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" data-id="${item.name}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Sales Section
function loadSalesData() {
    // Monthly Revenue Chart
    const monthlyRevenueCtx = document.getElementById('monthlyRevenueChart').getContext('2d');
    new Chart(monthlyRevenueCtx, {
        type: 'bar',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Revenue',
                data: [3000, 3500, 2800, 3150],
                backgroundColor: '#805ad5'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });

    // Sales Table
    const tbody = document.getElementById('salesTableBody');
    tbody.innerHTML = sampleData.sales.map(sale => `
        <tr>
            <td>${sale.date}</td>
            <td>${sale.item}</td>
            <td>${sale.quantity}</td>
            <td>$${sale.revenue.toFixed(2)}</td>
            <td>$${sale.profit.toFixed(2)}</td>
        </tr>
    `).join('');
}

// Inventory Section
function loadInventoryData() {
    // Low Stock List
    const lowStockList = document.getElementById('lowStockList');
    lowStockList.innerHTML = sampleData.inventory
        .filter(item => item.currentStock < item.reorderLevel)
        .map(item => `
            <div class="inventory-item">
                <span>${item.name}</span>
                <span class="stock-warning">${item.currentStock} left</span>
            </div>
        `).join('');

    // Out of Stock List
    const outOfStockList = document.getElementById('outOfStockList');
    outOfStockList.innerHTML = sampleData.inventory
        .filter(item => item.currentStock === 0)
        .map(item => `
            <div class="inventory-item">
                <span>${item.name}</span>
                <span class="stock-danger">Out of Stock</span>
            </div>
        `).join('');

    // Inventory Table
    const tbody = document.getElementById('inventoryTableBody');
    tbody.innerHTML = sampleData.inventory.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.currentStock}</td>
            <td>${item.reorderLevel}</td>
            <td>${item.lastRestocked}</td>
            <td>
                <button class="action-btn edit" data-id="${item.name}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn restock" data-id="${item.name}">
                    <i class="fas fa-plus"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Modal Functions
function showModal(title, content) {
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.classList.add('active');
}

function hideModal() {
    modal.classList.remove('active');
}

// Event Listeners
closeBtn.addEventListener('click', hideModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
});

// Add Member Button
document.querySelector('#members .add-btn').addEventListener('click', () => {
    showModal('Add New Member', `
        <form id="addMemberForm" class="settings-form">
            <div class="form-group">
                <label>Name</label>
                <input type="text" required>
            </div>
            <div class="form-group">
                <label>Role</label>
                <input type="text" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" required>
            </div>
            <button type="submit" class="save-btn">Add Member</button>
        </form>
    `);
});

// Add Menu Item Button
document.querySelector('#menu .add-btn').addEventListener('click', () => {
    showModal('Add New Menu Item', `
        <form id="addMenuItemForm" class="settings-form">
            <div class="form-group">
                <label>Item Name</label>
                <input type="text" required>
            </div>
            <div class="form-group">
                <label>Category</label>
                <select required>
                    <option value="coffee">Coffee</option>
                    <option value="tea">Tea</option>
                    <option value="pastries">Pastries</option>
                </select>
            </div>
            <div class="form-group">
                <label>Price</label>
                <input type="number" step="0.01" required>
            </div>
            <div class="form-group">
                <label>Initial Stock</label>
                <input type="number" required>
            </div>
            <button type="submit" class="save-btn">Add Item</button>
        </form>
    `);
});

// Logout
logoutBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        // Clear any stored data
        localStorage.removeItem('adminToken');
        // Redirect to login page
        window.location.href = 'login.html';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    if (!token) {
        window.location.href = '/login.html';
        return;
    }

    // Verify token on page load
    verifyToken(token);

    // Set up logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Set up user profile display
    const userData = JSON.parse(localStorage.getItem('adminUser') || '{}');
    const userProfile = document.querySelector('.user-profile span');
    if (userProfile) {
        userProfile.textContent = userData.fullName || 'Admin User';
    }

    // Initialize dashboard components
    initializeDashboard();
});

async function verifyToken(token) {
    try {
        const response = await fetch('/api/auth/verify', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok || !data.valid) {
            handleInvalidToken();
        }
    } catch (error) {
        console.error('Token verification failed:', error);
        handleInvalidToken();
    }
}

function handleInvalidToken() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/login.html';
}

function handleLogout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/login.html';
}

function initializeDashboard() {
    // Add event listeners for sidebar navigation
    const sidebarItems = document.querySelectorAll('.sidebar-nav li');
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            sidebarItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            // Show corresponding section
            const sectionId = item.getAttribute('data-section');
            const sections = document.querySelectorAll('.dashboard-section');
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Initialize charts and other dashboard components
    initializeCharts();
    loadDashboardData();
}

function initializeCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    borderColor: '#4CAF50',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Sales Chart
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'bar',
            data: {
                labels: ['Coffee', 'Tea', 'Pastries', 'Snacks'],
                datasets: [{
                    label: 'Sales',
                    data: [65, 59, 80, 81],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}

async function loadDashboardData() {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch('/api/dashboard/stats', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to load dashboard data');
        }

        const data = await response.json();
        updateDashboardStats(data);
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

function updateDashboardStats(data) {
    // Update statistics cards with real data
    // This is a placeholder - implement based on your actual data structure
    const stats = {
        totalMembers: data.totalMembers || 0,
        monthlyRevenue: data.monthlyRevenue || 0,
        menuItems: data.menuItems || 0,
        totalOrders: data.totalOrders || 0
    };

    // Update DOM elements with stats
    document.querySelector('.stat-number:nth-child(1)').textContent = stats.totalMembers;
    document.querySelector('.stat-number:nth-child(2)').textContent = `$${stats.monthlyRevenue}`;
    document.querySelector('.stat-number:nth-child(3)').textContent = stats.menuItems;
    document.querySelector('.stat-number:nth-child(4)').textContent = stats.totalOrders;
} 