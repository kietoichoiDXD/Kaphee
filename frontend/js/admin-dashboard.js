// DOM Elements
const sidebarNav = document.querySelector('.sidebar-nav');
const sections = document.querySelectorAll('.dashboard-section');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.querySelector('.modal-body');
const closeBtn = document.querySelector('.close-btn');
const logoutBtn = document.getElementById('logoutBtn');

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
async function loadSectionData(sectionId) {
    try {
        switch (sectionId) {
            case 'overview':
                await loadOverviewData();
                break;
            case 'members':
                await loadMembersData();
                break;
            case 'menu':
                await loadMenuData();
                break;
            case 'sales':
                await loadSalesData();
                break;
            case 'inventory':
                await loadInventoryData();
                break;
            case 'inquiries':
                await loadInquiriesData();
                break;
            case 'settings':
                 // Settings don't require data loading from API in this basic version
                 break;
        }
    } catch (error) {
        console.error(`Error loading ${sectionId} data:`, error);
        showNotification('Error loading data. Please try again.', 'error');
    }
}

// Overview Section (Keep existing function)
async function loadOverviewData() {
    // ... existing code ...
}

// Members Section (Keep existing function)
async function loadMembersData() {
    // ... existing code ...
}

// Menu Section (Keep existing function)
async function loadMenuData() {
   // ... existing code ...
}

// Sales Section (Keep existing function)
async function loadSalesData() {
    // ... existing code ...
}

// Inventory Section (Keep existing function)
async function loadInventoryData() {
    // ... existing code ...
}

// Inquiries Section
async function loadInquiriesData() {
    try {
        const inquiries = await inquiriesApi.list();
        const tbody = document.getElementById('inquiriesTableBody');
        tbody.innerHTML = inquiries.map(inquiry => `
            <tr>
                <td>${inquiry.dishName}</td>
                <td>${inquiry.customerName}</td>
                <td>${inquiry.customerEmail}</td>
                <td>${inquiry.message}</td>
                <td><span class="status-badge ${inquiry.status.toLowerCase()}">${inquiry.status}</span></td>
                <td>${new Date(inquiry.createdAt).toLocaleDateString()}</td>
                <td>
                    <select class="inquiry-status-select" data-id="${inquiry._id}">
                        <option value="Pending" ${inquiry.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Replied" ${inquiry.status === 'Replied' ? 'selected' : ''}>Replied</option>
                        <option value="Closed" ${inquiry.status === 'Closed' ? 'selected' : ''}>Closed</option>
                    </select>
                </td>
            </tr>
        `).join('');

        // Add event listeners for status select changes
        addInquiryStatusListeners();

    } catch (error) {
        console.error('Error loading inquiries data:', error);
        showNotification('Error loading inquiries data', 'error');
    }
}

// Handle Inquiry Status Changes
function addInquiryStatusListeners() {
    const selects = document.querySelectorAll('.inquiry-status-select');
    selects.forEach(select => {
        select.addEventListener('change', async (e) => {
            const inquiryId = e.target.dataset.id;
            const newStatus = e.target.value;
            try {
                await inquiriesApi.update(inquiryId, { status: newStatus });
                showNotification('Inquiry status updated!', 'success');
                // Optionally reload data or update UI directly
                 loadInquiriesData(); // Reload for simplicity
            } catch (error) {
                console.error('Error updating inquiry status:', error);
                showNotification('Failed to update inquiry status.', 'error');
                 loadInquiriesData(); // Reload to revert to actual status
            }
        });
    });
}

// Helper Functions (Keep existing functions)
function addTableActionListeners(section) {
   // ... existing code ...
}

// Modal Functions (Keep existing functions)
function showModal(title, content) {
   // ... existing code ...
}

function hideModal() {
   // ... existing code ...
}

// Event Listeners (Keep existing listeners, add for Inquiries if needed later)
closeBtn.addEventListener('click', hideModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
});

// Add Member Button (Keep existing function)
document.querySelector('#members .add-btn').addEventListener('click', () => {
    // ... existing code ...
});

// Add Menu Item Button (Keep existing function)
document.querySelector('#menu .add-btn').addEventListener('click', () => {
   // ... existing code ...
});

// Logout (Keep existing function)
logoutBtn.addEventListener('click', async () => {
    // ... existing code ...
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
        window.location.href = 'login.html';
        return;
    }

    // Load initial section data
    loadSectionData('overview');
});

// Basic notification function (assuming you have one)
function showNotification(message, type) {
    console.log(`Notification (${type}): ${message}`);
    // Implement your actual notification display logic here
} 