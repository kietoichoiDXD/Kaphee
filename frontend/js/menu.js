// DOM Elements
const menuItemsContainer = document.getElementById('menuItems');
const filterButtons = document.querySelectorAll('.filter-btn');
const inquiryModal = document.getElementById('inquiryModal');
const inquiryForm = document.getElementById('inquiryForm');
const closeInquiryModalBtn = document.querySelector('#inquiryModal .close-btn');
const inquiryDishNameInput = document.getElementById('inquiryDishName');

// Function to fetch and display menu items
async function fetchMenuItems() {
    try {
        const menuItems = await menuApi.list(); // Use the API utility
        displayMenuItems(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        showNotification('Failed to load menu items. Please try again later.', 'error');
    }
}

// Function to display menu items
function displayMenuItems(items) {
    menuItemsContainer.innerHTML = ''; // Clear current items
    if (items.length === 0) {
        menuItemsContainer.innerHTML = '<p>No menu items found.</p>';
        return;
    }

    items.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.classList.add('menu-item');
        menuItemElement.dataset.category = item.category;
        menuItemElement.innerHTML = `
            <img src="${item.imageUrl || 'assets/images/default-dish.jpg'}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description || 'Delicious item.'}</p>
            <span class="price">$${item.price.toFixed(2)}</span>
            <button class="inquire-btn" data-dish-name="${item.name}">Inquire</button>
        `;
        menuItemsContainer.appendChild(menuItemElement);
    });

    // Add event listeners to inquire buttons after rendering
    document.querySelectorAll('.inquire-btn').forEach(button => {
        button.addEventListener('click', handleInquiryClick);
    });
}

// Function to filter menu items
function filterMenuItems(category) {
    const menuItems = menuItemsContainer.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        const itemCategory = item.dataset.category;
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Handle filter button clicks
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active class
        document.querySelector('.filter-btn.active').classList.remove('active');
        button.classList.add('active');

        const category = button.dataset.filter;
        filterMenuItems(category);
    });
});

// Handle inquiry button click
function handleInquiryClick(e) {
    const dishName = e.target.dataset.dishName;
    inquiryDishNameInput.value = dishName;
    inquiryModal.classList.add('active'); // Show the modal
}

// Handle inquiry form submission
inquiryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inquiryData = Object.fromEntries(formData);

    try {
        await inquiriesApi.create(inquiryData);
        showNotification('Your inquiry has been submitted!', 'success');
        hideInquiryModal();
        inquiryForm.reset();
    } catch (error) {
        console.error('Error submitting inquiry:', error);
        showNotification('Failed to submit inquiry. Please try again.', 'error');
    }
});

// Close inquiry modal
closeInquiryModalBtn.addEventListener('click', hideInquiryModal);
inquiryModal.addEventListener('click', (e) => {
    if (e.target === inquiryModal) hideInquiryModal();
});

function hideInquiryModal() {
    inquiryModal.classList.remove('active');
}

// Initialize menu page
document.addEventListener('DOMContentLoaded', () => {
    fetchMenuItems(); // Fetch and display menu items on load

    // Ensure initial filter is applied
    const initialFilterButton = document.querySelector('.filter-btn.active');
    if (initialFilterButton) {
        filterMenuItems(initialFilterButton.dataset.filter);
    }
});

// Basic notification function (assuming you have one)
function showNotification(message, type) {
    console.log(`Notification (${type}): ${message}`);
    // Implement your actual notification display logic here
} 