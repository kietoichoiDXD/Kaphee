// js/category-management.js
class CategoryManager {
    constructor() {
        this.apiUrl = '/api/categories';
        this.init();
    }

    init() {
        this.loadCategories();
        this.bindEvents();
    }

    async loadCategories() {
        try {
            const response = await fetch(this.apiUrl);
            const categories = await response.json();
            this.renderCategories(categories);
        } catch (error) {
            console.error('Error loading categories:', error);
            this.showError('Failed to load categories');
        }
    }

    renderCategories(categories) {
        const container = document.getElementById('categoriesContainer');
        if (!container) return;

        container.innerHTML = categories.map(category => `
            <div class="category-card" data-id="${category._id}">
                <div class="category-image">
                    <img src="${category.image}" alt="${category.name}" 
                         onerror="this.src='assets/images/placeholder.jpg'">
                </div>
                <div class="category-info">
                    <h3>${category.name}</h3>
                    <p>${category.description}</p>
                    <div class="category-stats">
                        <span class="order">Order: ${category.displayOrder}</span>
                        <span class="status ${category.isActive ? 'active' : 'inactive'}">
                            ${category.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
                <div class="category-actions">
                    <button class="btn-edit" onclick="categoryManager.editCategory('${category._id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-delete" onclick="categoryManager.deleteCategory('${category._id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    bindEvents() {
        // Add category form
        const addForm = document.getElementById('addCategoryForm');
        if (addForm) {
            addForm.addEventListener('submit', (e) => this.handleAddCategory(e));
        }

        // Search categories
        const searchInput = document.getElementById('categorySearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.searchCategories(e.target.value));
        }
    }

    async handleAddCategory(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const categoryData = Object.fromEntries(formData);

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(categoryData)
            });

            if (response.ok) {
                this.showSuccess('Category added successfully');
                this.loadCategories();
                e.target.reset();
                this.closeModal();
            } else {
                const error = await response.json();
                this.showError(error.msg || 'Failed to add category');
            }
        } catch (error) {
            console.error('Error adding category:', error);
            this.showError('Failed to add category');
        }
    }

    async editCategory(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`);
            const category = await response.json();
            this.showEditModal(category);
        } catch (error) {
            console.error('Error loading category:', error);
            this.showError('Failed to load category');
        }
    }

    showEditModal(category) {
        const modal = document.getElementById('editCategoryModal');
        if (!modal) return;

        // Populate form fields
        document.getElementById('editCategoryId').value = category._id;
        document.getElementById('editCategoryName').value = category.name;
        document.getElementById('editCategoryDescription').value = category.description;
        document.getElementById('editCategoryImage').value = category.image;
        document.getElementById('editCategoryOrder').value = category.displayOrder;
        document.getElementById('editCategoryActive').checked = category.isActive;

        modal.style.display = 'block';
    }

    async updateCategory(id, data) {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                this.showSuccess('Category updated successfully');
                this.loadCategories();
                this.closeModal();
            } else {
                const error = await response.json();
                this.showError(error.msg || 'Failed to update category');
            }
        } catch (error) {
            console.error('Error updating category:', error);
            this.showError('Failed to update category');
        }
    }

    async deleteCategory(id) {
        if (!confirm('Are you sure you want to delete this category?')) {
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                this.showSuccess('Category deleted successfully');
                this.loadCategories();
            } else {
                const error = await response.json();
                this.showError(error.msg || 'Failed to delete category');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            this.showError('Failed to delete category');
        }
    }

    searchCategories(query) {
        const cards = document.querySelectorAll('.category-card');
        cards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const matches = name.includes(query.toLowerCase()) || 
                           description.includes(query.toLowerCase());
            card.style.display = matches ? 'block' : 'none';
        });
    }

    showSuccess(message) {
        // Implement toast notification
        console.log('Success:', message);
    }

    showError(message) {
        // Implement error notification
        console.error('Error:', message);
    }

    closeModal() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => modal.style.display = 'none');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.categoryManager = new CategoryManager();
});