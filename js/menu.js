// Menu data (simulating a database)
const menuItems = [
    {
        id: 1,
        name: "Classic Espresso",
        description: "Rich and intense Italian-style espresso, served in a traditional cup",
        price: 3.50,
        category: "coffee",
        image: "assets/images/menu/espresso.jpg",
        inStock: true
    },
    {
        id: 2,
        name: "Cappuccino",
        description: "Espresso with steamed milk and a thick layer of foam, dusted with cocoa",
        price: 4.50,
        category: "coffee",
        image: "assets/images/menu/cappuccino.jpg",
        inStock: true
    },
    {
        id: 3,
        name: "Earl Grey Tea",
        description: "Classic black tea flavored with bergamot oil, served with a slice of lemon",
        price: 3.00,
        category: "tea",
        image: "assets/images/menu/earl-grey.jpg",
        inStock: true
    },
    {
        id: 4,
        name: "Croissant",
        description: "Buttery, flaky French pastry, served warm",
        price: 3.50,
        category: "pastry",
        image: "assets/images/menu/croissant.jpg",
        inStock: true
    },
    {
        id: 5,
        name: "Tiramisu",
        description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
        price: 6.50,
        category: "dessert",
        image: "assets/images/menu/tiramisu.jpg",
        inStock: false
    },
    {
        id: 6,
        name: "Vienna Coffee",
        description: "Espresso topped with whipped cream and chocolate shavings",
        price: 5.00,
        category: "coffee",
        image: "assets/images/menu/vienna.jpg",
        inStock: true
    },
    {
        id: 7,
        name: "Chamomile Tea",
        description: "Soothing herbal tea with honey and a slice of fresh ginger",
        price: 3.50,
        category: "tea",
        image: "assets/images/menu/chamomile.jpg",
        inStock: true
    },
    {
        id: 8,
        name: "Pain au Chocolat",
        description: "Flaky pastry filled with rich dark chocolate",
        price: 4.00,
        category: "pastry",
        image: "assets/images/menu/pain-au-chocolat.jpg",
        inStock: true
    }
];

// DOM Elements
const menuGrid = document.getElementById('menuGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');

// Initialize menu
function initMenu() {
    displayMenuItems(menuItems);
    setupEventListeners();
}

// Display menu items
function displayMenuItems(items) {
    menuGrid.innerHTML = '';
    
    items.forEach(item => {
        const menuItem = createMenuItemElement(item);
        menuGrid.appendChild(menuItem);
    });
}

// Create menu item element
function createMenuItemElement(item) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.setAttribute('data-category', item.category);
    
    div.innerHTML = `
        <div class="menu-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="menu-item-content">
            <div class="menu-item-header">
                <h3 class="menu-item-title">${item.name}</h3>
                <span class="menu-item-price">$${item.price.toFixed(2)}</span>
            </div>
            <p class="menu-item-description">${item.description}</p>
            <div class="menu-item-footer">
                <span class="menu-item-category">${item.category}</span>
                <span class="menu-item-status ${item.inStock ? 'in-stock' : 'out-of-stock'}">
                    ${item.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
            </div>
        </div>
    `;
    
    return div;
}

// Filter menu items
function filterMenuItems(category, searchTerm = '') {
    let filteredItems = menuItems;
    
    // Filter by category
    if (category !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === category);
    }
    
    // Filter by search term
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredItems = filteredItems.filter(item => 
            item.name.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term)
        );
    }
    
    displayMenuItems(filteredItems);
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            const category = button.getAttribute('data-filter');
            const searchTerm = searchInput.value;
            filterMenuItems(category, searchTerm);
        });
    });
    
    // Search input
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value;
        const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        filterMenuItems(activeCategory, searchTerm);
    });
}

// Initialize menu when DOM is loaded
document.addEventListener('DOMContentLoaded', initMenu); 