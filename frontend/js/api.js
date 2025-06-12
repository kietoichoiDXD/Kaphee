class Api {
    static async request(endpoint, options = {}) {
        const token = localStorage.getItem('adminToken');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };

        try {
            const response = await fetch(endpoint, {
                ...options,
                headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    static async get(endpoint) {
        return this.request(endpoint);
    }

    static async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    static async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    static async delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE'
        });
    }
}

// Auth API
const authApi = {
    login: (credentials) => Api.post(config.getEndpoint(config.endpoints.auth.login), credentials),
    register: (userData) => Api.post(config.getEndpoint(config.endpoints.auth.register), userData),
    logout: () => Api.post(config.getEndpoint(config.endpoints.auth.logout))
};

// Members API
const membersApi = {
    list: () => Api.get(config.getEndpoint(config.endpoints.members.list)),
    create: (memberData) => Api.post(config.getEndpoint(config.endpoints.members.create), memberData),
    update: (id, memberData) => Api.put(config.getEndpoint(config.endpoints.members.update, { id }), memberData),
    delete: (id) => Api.delete(config.getEndpoint(config.endpoints.members.delete, { id }))
};

// Menu API
const menuApi = {
    list: () => Api.get(config.getEndpoint(config.endpoints.menu.list)),
    create: (itemData) => Api.post(config.getEndpoint(config.endpoints.menu.create), itemData),
    update: (id, itemData) => Api.put(config.getEndpoint(config.endpoints.menu.update, { id }), itemData),
    delete: (id) => Api.delete(config.getEndpoint(config.endpoints.menu.delete, { id }))
};

// Sales API
const salesApi = {
    list: () => Api.get(config.getEndpoint(config.endpoints.sales.list)),
    create: (saleData) => Api.post(config.getEndpoint(config.endpoints.sales.create), saleData),
    monthly: () => Api.get(config.getEndpoint(config.endpoints.sales.monthly))
};

// Inventory API
const inventoryApi = {
    list: () => Api.get(config.getEndpoint(config.endpoints.inventory.list)),
    create: (itemData) => Api.post(config.getEndpoint(config.endpoints.inventory.create), itemData),
    update: (id, itemData) => Api.put(config.getEndpoint(config.endpoints.inventory.update, { id }), itemData),
    restock: (id, quantity) => Api.post(config.getEndpoint(config.endpoints.inventory.restock, { id }), { quantity })
};

// Inquiries API
const inquiriesApi = {
    create: (inquiryData) => Api.post(config.getEndpoint(config.endpoints.inquiries.create), inquiryData),
    list: () => Api.get(config.getEndpoint(config.endpoints.inquiries.list)), // Admin view
    update: (id, updateData) => Api.put(config.getEndpoint(config.endpoints.inquiries.update, { id }), updateData) // Admin view
}; 