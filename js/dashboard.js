// DOM Elements
const profileForm = document.getElementById('profileForm');
const profileImage = document.getElementById('profileImage');
const editImageBtn = document.getElementById('editImageBtn');
const dashboardNav = document.querySelectorAll('.dashboard-nav a');
const contentSections = document.querySelectorAll('.dashboard-content > div');
const logoutBtn = document.getElementById('logoutBtn');

// Check if user is logged in
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    return user;
}

// Initialize dashboard
function initDashboard() {
    const user = checkAuth();
    if (!user) return;

    // Set user profile data
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
    
    // Set form values
    document.getElementById('fullName').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone || '';
    document.getElementById('address').value = user.address || '';

    // Load user data
    loadOrders();
    loadReservations();
    loadFavorites();
}

// Handle profile image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImage.src = e.target.result;
            // Save to localStorage
            const user = JSON.parse(localStorage.getItem('currentUser'));
            user.profileImage = e.target.result;
            localStorage.setItem('currentUser', JSON.stringify(user));
        };
        reader.readAsDataURL(file);
    }
}

// Handle profile form submission
function handleProfileSubmit(event) {
    event.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const formData = new FormData(profileForm);
    
    // Update user data
    user.name = formData.get('fullName');
    user.email = formData.get('email');
    user.phone = formData.get('phone');
    user.address = formData.get('address');
    
    // Update localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Update display
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
    
    showNotification('Profile updated successfully!', 'success');
}

// Load orders
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersList = document.querySelector('.orders-list');
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p class="no-data">No orders found.</p>';
        return;
    }
    
    ordersList.innerHTML = orders.map(order => `
        <div class="order-item" data-aos="fade-up">
            <div class="order-header">
                <span class="order-date">${new Date(order.date).toLocaleDateString()}</span>
                <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item-row">
                        <span>${item.name} x${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">
                Total: $${order.total.toFixed(2)}
            </div>
        </div>
    `).join('');
}

// Load reservations
function loadReservations() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const reservationsList = document.querySelector('.reservations-list');
    
    if (reservations.length === 0) {
        reservationsList.innerHTML = '<p class="no-data">No reservations found.</p>';
        return;
    }
    
    reservationsList.innerHTML = reservations.map(reservation => `
        <div class="reservation-item" data-aos="fade-up">
            <div class="reservation-header">
                <span class="reservation-date">${new Date(reservation.date).toLocaleDateString()} at ${reservation.time}</span>
                <span class="reservation-status ${reservation.status.toLowerCase()}">${reservation.status}</span>
            </div>
            <div class="reservation-details">
                <div class="reservation-detail">
                    <strong>Guests:</strong> ${reservation.guests}
                </div>
                <div class="reservation-detail">
                    <strong>Table:</strong> ${reservation.table}
                </div>
                <div class="reservation-detail">
                    <strong>Special Requests:</strong> ${reservation.requests || 'None'}
                </div>
            </div>
        </div>
    `).join('');
}

// Load favorites
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesGrid = document.querySelector('.favorites-grid');
    
    if (favorites.length === 0) {
        favoritesGrid.innerHTML = '<p class="no-data">No favorite items found.</p>';
        return;
    }
    
    favoritesGrid.innerHTML = favorites.map(item => `
        <div class="favorite-item" data-aos="fade-up">
            <div class="favorite-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="favorite-item-content">
                <h3 class="favorite-item-title">${item.name}</h3>
                <p class="favorite-item-price">$${item.price.toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

// Handle navigation
function handleNavigation(event) {
    event.preventDefault();
    const target = event.target.getAttribute('href').substring(1);
    
    // Update active state
    dashboardNav.forEach(nav => nav.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show target section
    contentSections.forEach(section => {
        section.style.display = section.id === target ? 'block' : 'none';
    });
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('currentUser');
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
document.addEventListener('DOMContentLoaded', initDashboard);
editImageBtn.addEventListener('click', () => document.getElementById('imageUpload').click());
document.getElementById('imageUpload').addEventListener('change', handleImageUpload);
profileForm.addEventListener('submit', handleProfileSubmit);
dashboardNav.forEach(nav => nav.addEventListener('click', handleNavigation));
logoutBtn.addEventListener('click', handleLogout);

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
}); 