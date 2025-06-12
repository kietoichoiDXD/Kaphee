import { firebaseService } from '../services/firebase-service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

class Menu {
    constructor() {
        this.menuItems = [];
        this.categories = [];
        this.currentCategory = null;
        this.searchTerm = '';
        this.page = 1;
        this.loading = false;
        this.lastDoc = null;
        this.hasMore = true;
        this.animations = [];
    }

    async init() {
        this.setupEventListeners();
        await this.loadCategories();
        await this.loadMenuItems();
        this.setupAnimations();
    }

    setupEventListeners() {
        // Category filter
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleCategoryClick(btn.dataset.category));
        });

        // Search input with debounce
        const searchInput = document.querySelector('#menu-search');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => this.handleSearch(e.target.value), 300));
        }

        // Load more button
        const loadMoreBtn = document.querySelector('#load-more');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMore());
        }

        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                this.handleAddToCart(e.target.closest('.menu-item').dataset.id);
            }
        });

        // Handle window resize
        window.addEventListener('resize', debounce(() => this.handleResize(), 250));
    }

    setupAnimations() {
        // Animate menu items on scroll
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power2.out"
            });
        });

        // Animate category buttons
        const categoryButtons = document.querySelectorAll('.category-btn');
        gsap.from(categoryButtons, {
            y: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)"
        });
    }

    async loadCategories() {
        try {
            const categories = await firebaseService.getCategories();
            this.categories = categories;
            this.renderCategories();
        } catch (error) {
            console.error('Error loading categories:', error);
            this.showError('Failed to load categories');
        }
    }

    async loadMenuItems() {
        if (this.loading || !this.hasMore) return;

        this.loading = true;
        this.showLoading();

        try {
            const items = await firebaseService.getMenuItems(
                this.currentCategory,
                12,
                this.lastDoc
            );

            if (items.length < 12) {
                this.hasMore = false;
                document.querySelector('#load-more').style.display = 'none';
            }

            this.menuItems = [...this.menuItems, ...items];
            this.lastDoc = items[items.length - 1];
            await this.renderMenuItems();
            this.setupAnimations();
        } catch (error) {
            console.error('Error loading menu items:', error);
            this.showError('Failed to load menu items');
        } finally {
            this.loading = false;
            this.hideLoading();
        }
    }

    async handleCategoryClick(category) {
        // Animate out current items
        const menuContainer = document.querySelector('.menu-container');
        gsap.to(menuContainer.children, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            stagger: 0.05,
            onComplete: async () => {
                this.currentCategory = category === 'all' ? null : category;
                this.menuItems = [];
                this.page = 1;
                this.lastDoc = null;
                this.hasMore = true;
                document.querySelector('#load-more').style.display = 'block';
                await this.loadMenuItems();
            }
        });
    }

    handleSearch(term) {
        this.searchTerm = term.toLowerCase();
        this.filterAndRenderItems();
    }

    filterAndRenderItems() {
        const filteredItems = this.menuItems.filter(item => 
            item.name.toLowerCase().includes(this.searchTerm) ||
            item.description.toLowerCase().includes(this.searchTerm)
        );

        // Animate out current items
        const menuContainer = document.querySelector('.menu-container');
        gsap.to(menuContainer.children, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            stagger: 0.05,
            onComplete: () => {
                this.renderMenuItems(filteredItems);
            }
        });
    }

    renderCategories() {
        const categoriesContainer = document.querySelector('.categories-container');
        if (!categoriesContainer) return;

        const html = `
            <button class="category-btn active" data-category="all">All</button>
            ${this.categories.map(category => `
                <button class="category-btn" data-category="${category.id}">
                    ${category.name}
                </button>
            `).join('')}
        `;
        categoriesContainer.innerHTML = html;
    }

    async renderMenuItems(items = this.menuItems) {
        const menuContainer = document.querySelector('.menu-container');
        if (!menuContainer) return;

        const html = items.map(item => `
            <div class="menu-item" data-id="${item.id}">
                <div class="menu-item-image">
                    <img src="${item.imageURL}" alt="${item.name}" loading="lazy">
                    ${item.isAvailable ? '' : '<div class="sold-out">Sold Out</div>'}
                </div>
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="menu-item-footer">
                        <span class="price">$${item.price.toFixed(2)}</span>
                        <button class="add-to-cart" ${!item.isAvailable ? 'disabled' : ''}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        menuContainer.innerHTML = html;

        // Animate in new items
        gsap.from(menuContainer.children, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });
    }

    handleAddToCart(itemId) {
        // Add animation for cart button
        const button = document.querySelector(`[data-id="${itemId}"] .add-to-cart`);
        gsap.to(button, {
            scale: 1.2,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        });

        // Update cart count with animation
        const cartCount = document.querySelector('.cart-count');
        const currentCount = parseInt(cartCount.textContent);
        gsap.to(cartCount, {
            scale: 1.5,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                cartCount.textContent = currentCount + 1;
            }
        });

        // TODO: Implement actual cart functionality
        console.log('Added to cart:', itemId);
    }

    handleResize() {
        // Update animations on resize
        ScrollTrigger.refresh();
    }

    showLoading() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.display = 'block';
            gsap.to(loader, {
                rotation: 360,
                duration: 1,
                repeat: -1,
                ease: "none"
            });
        }
    }

    hideLoading() {
        const loader = document.querySelector('.loader');
        if (loader) {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    loader.style.display = 'none';
                }
            });
        }
    }

    showError(message) {
        // Create error notification
        const notification = document.createElement('div');
        notification.className = 'alert alert-error';
        notification.textContent = message;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        gsap.from(notification, {
            y: -50,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
        });

        // Remove after 3 seconds
        setTimeout(() => {
            gsap.to(notification, {
                y: -50,
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    notification.remove();
                }
            });
        }, 3000);
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const menu = new Menu();
    menu.init();
}); 