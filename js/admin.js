// DOM Elements
const adminNav = document.querySelectorAll('.admin-nav a');
const contentSections = document.querySelectorAll('.content-section');
const adminLogoutBtn = document.getElementById('adminLogoutBtn');
const adminProfileForm = document.getElementById('adminProfileForm');
const businessSettingsForm = document.getElementById('businessSettingsForm');
const addMenuItemBtn = document.getElementById('addMenuItemBtn');
const menuItemsGrid = document.getElementById('menuItemsGrid');
const ordersTableBody = document.getElementById('ordersTableBody');
const reservationsTableBody = document.getElementById('reservationsTableBody');
const usersTableBody = document.getElementById('usersTableBody');

// Check if admin is logged in
function checkAdminAuth() {
    const admin = JSON.parse(localStorage.getItem('currentAdmin'));
    if (!admin) {
        window.location.href = 'login.html';
        return;
    }
    return admin;
}

// Initialize admin dashboard
function initAdminDashboard() {
    const admin = checkAdminAuth();
    if (!admin) return;

    // Set admin profile data
    document.getElementById('adminName').textContent = admin.name;
    document.getElementById('adminEmail').textContent = admin.email;
    document.getElementById('adminFullName').value = admin.name;
    document.getElementById('adminEmail').value = admin.email;

    // Load dashboard data
    loadDashboardStats();
    loadRecentActivity();
    loadOrders();
    loadReservations();
    loadUsers();
    loadMenuItems();

    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
}

// Load dashboard statistics
function loadDashboardStats() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Calculate total revenue
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    
    // Update stats
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('activeReservations').textContent = 
        reservations.filter(r => r.status === 'Confirmed').length;
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('totalRevenue').textContent = `$${totalRevenue.toFixed(2)}`;
}

// Load recent activity
function loadRecentActivity() {
    const activities = JSON.parse(localStorage.getItem('activities')) || [];
    const recentActivity = document.getElementById('recentActivity');
    
    if (activities.length === 0) {
        recentActivity.innerHTML = '<p class="no-data">No recent activity.</p>';
        return;
    }
    
    recentActivity.innerHTML = activities.slice(0, 5).map(activity => `
        <div class="activity-item" data-aos="fade-up">
            <div class="activity-icon">
                <i class="fas ${getActivityIcon(activity.type)}"></i>
            </div>
            <div class="activity-details">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-time">${new Date(activity.timestamp).toLocaleString()}</div>
            </div>
        </div>
    `).join('');
}

// Get activity icon based on type
function getActivityIcon(type) {
    const icons = {
        order: 'fa-shopping-cart',
        reservation: 'fa-calendar-check',
        user: 'fa-user',
        menu: 'fa-utensils'
    };
    return icons[type] || 'fa-info-circle';
}

// Load orders
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    if (orders.length === 0) {
        ordersTableBody.innerHTML = '<tr><td colspan="7" class="no-data">No orders found.</td></tr>';
        return;
    }
    
    ordersTableBody.innerHTML = orders.map(order => `
        <tr data-aos="fade-up">
            <td>#${order.id}</td>
            <td>${order.customerName}</td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>${order.items.length} items</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>
                <span class="status-badge ${order.status.toLowerCase()}">${order.status}</span>
            </td>
            <td>
                <button class="action-btn edit" onclick="viewOrder('${order.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn delete" onclick="deleteOrder('${order.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Load reservations
function loadReservations() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    
    if (reservations.length === 0) {
        reservationsTableBody.innerHTML = '<tr><td colspan="7" class="no-data">No reservations found.</td></tr>';
        return;
    }
    
    reservationsTableBody.innerHTML = reservations.map(reservation => `
        <tr data-aos="fade-up">
            <td>#${reservation.id}</td>
            <td>${reservation.customerName}</td>
            <td>${new Date(reservation.date).toLocaleDateString()} at ${reservation.time}</td>
            <td>${reservation.guests}</td>
            <td>${reservation.table}</td>
            <td>
                <span class="status-badge ${reservation.status.toLowerCase()}">${reservation.status}</span>
            </td>
            <td>
                <button class="action-btn edit" onclick="viewReservation('${reservation.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn delete" onclick="deleteReservation('${reservation.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Load users
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.length === 0) {
        usersTableBody.innerHTML = '<tr><td colspan="7" class="no-data">No users found.</td></tr>';
        return;
    }
    
    usersTableBody.innerHTML = users.map(user => `
        <tr data-aos="fade-up">
            <td>#${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${new Date(user.joinDate).toLocaleDateString()}</td>
            <td>
                <span class="status-badge ${user.status.toLowerCase()}">${user.status}</span>
            </td>
            <td>
                <button class="action-btn edit" onclick="editUser('${user.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="deleteUser('${user.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Load menu items
function loadMenuItems() {
    const menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
    
    if (menuItems.length === 0) {
        menuItemsGrid.innerHTML = '<p class="no-data">No menu items found.</p>';
        return;
    }
    
    menuItemsGrid.innerHTML = menuItems.map(item => `
        <div class="menu-item-card" data-aos="fade-up">
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-title">${item.name}</h3>
                    <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-actions">
                    <button class="action-btn edit" onclick="editMenuItem('${item.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn delete" onclick="deleteMenuItem('${item.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Handle navigation
function handleNavigation(event) {
    event.preventDefault();
    const target = event.target.getAttribute('href').substring(1);
    
    // Update active state
    adminNav.forEach(nav => nav.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show target section
    contentSections.forEach(section => {
        section.style.display = section.id === target ? 'block' : 'none';
    });
}

// Handle admin profile update
function handleAdminProfileUpdate(event) {
    event.preventDefault();
    
    const admin = JSON.parse(localStorage.getItem('currentAdmin'));
    const formData = new FormData(adminProfileForm);
    
    // Update admin data
    admin.name = formData.get('fullName');
    admin.email = formData.get('email');
    
    if (formData.get('password')) {
        if (formData.get('password') !== formData.get('confirmPassword')) {
            showNotification('Passwords do not match!', 'error');
            return;
        }
        admin.password = formData.get('password');
    }
    
    // Update localStorage
    localStorage.setItem('currentAdmin', JSON.stringify(admin));
    
    // Update display
    document.getElementById('adminName').textContent = admin.name;
    document.getElementById('adminEmail').textContent = admin.email;
    
    showNotification('Profile updated successfully!', 'success');
}

// Handle business settings update
function handleBusinessSettingsUpdate(event) {
    event.preventDefault();
    
    const formData = new FormData(businessSettingsForm);
    const settings = {
        businessName: formData.get('businessName'),
        businessEmail: formData.get('businessEmail'),
        businessPhone: formData.get('businessPhone'),
        businessAddress: formData.get('businessAddress'),
        businessHours: formData.get('businessHours')
    };
    
    // Update localStorage
    localStorage.setItem('businessSettings', JSON.stringify(settings));
    
    showNotification('Business settings updated successfully!', 'success');
}

// Handle menu item addition
function handleAddMenuItem() {
    // Show modal or form for adding new menu item
    // Implementation depends on your UI design
}

// View order details
function viewOrder(orderId) {
    // Show modal with order details
    // Implementation depends on your UI design
}

// Delete order
function deleteOrder(orderId) {
    if (confirm('Are you sure you want to delete this order?')) {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const updatedOrders = orders.filter(order => order.id !== orderId);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        loadOrders();
        showNotification('Order deleted successfully!', 'success');
    }
}

// View reservation details
function viewReservation(reservationId) {
    // Show modal with reservation details
    // Implementation depends on your UI design
}

// Delete reservation
function deleteReservation(reservationId) {
    if (confirm('Are you sure you want to delete this reservation?')) {
        const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        const updatedReservations = reservations.filter(r => r.id !== reservationId);
        localStorage.setItem('reservations', JSON.stringify(updatedReservations));
        loadReservations();
        showNotification('Reservation deleted successfully!', 'success');
    }
}

// Edit user
function editUser(userId) {
    // Show modal or form for editing user
    // Implementation depends on your UI design
}

// Delete user
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = users.filter(user => user.id !== userId);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        loadUsers();
        showNotification('User deleted successfully!', 'success');
    }
}

// Edit menu item
function editMenuItem(itemId) {
    // Show modal or form for editing menu item
    // Implementation depends on your UI design
}

// Delete menu item
function deleteMenuItem(itemId) {
    if (confirm('Are you sure you want to delete this menu item?')) {
        const menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
        const updatedMenuItems = menuItems.filter(item => item.id !== itemId);
        localStorage.setItem('menuItems', JSON.stringify(updatedMenuItems));
        loadMenuItems();
        showNotification('Menu item deleted successfully!', 'success');
    }
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('currentAdmin');
    window.location.href = 'login.html';
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initAdminDashboard);
adminNav.forEach(nav => nav.addEventListener('click', handleNavigation));
adminLogoutBtn.addEventListener('click', handleLogout);
adminProfileForm.addEventListener('submit', handleAdminProfileUpdate);
businessSettingsForm.addEventListener('submit', handleBusinessSettingsUpdate);
addMenuItemBtn.addEventListener('click', handleAddMenuItem);

// Filter event listeners
document.getElementById('orderStatusFilter').addEventListener('change', loadOrders);
document.getElementById('orderDateFilter').addEventListener('change', loadOrders);
document.getElementById('reservationStatusFilter').addEventListener('change', loadReservations);
document.getElementById('reservationDateFilter').addEventListener('change', loadReservations);
document.getElementById('userSearchInput').addEventListener('input', loadUsers);
document.getElementById('userRoleFilter').addEventListener('change', loadUsers);
document.getElementById('menuCategoryFilter').addEventListener('change', loadMenuItems); 