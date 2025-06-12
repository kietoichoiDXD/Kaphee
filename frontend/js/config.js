const config = {
    apiBaseUrl: 'http://localhost:5000/api',
    endpoints: {
        auth: {
            login: '/auth/login',
            register: '/auth/register',
            logout: '/auth/logout'
        },
        members: {
            list: '/members',
            create: '/members',
            update: '/members/:id',
            delete: '/members/:id'
        },
        menu: {
            list: '/menu',
            create: '/menu',
            update: '/menu/:id',
            delete: '/menu/:id'
        },
        sales: {
            list: '/sales',
            create: '/sales',
            monthly: '/sales/monthly'
        },
        inventory: {
            list: '/inventory',
            create: '/inventory',
            update: '/inventory/:id',
            restock: '/inventory/:id/restock'
        },
        inquiries: {
            create: '/inquiries',
            list: '/inquiries', // Admin view
            update: '/inquiries/:id' // Admin view
        }
    },
    getEndpoint: (path, params = {}) => {
        let url = config.apiBaseUrl + path;
        Object.keys(params).forEach(key => {
            url = url.replace(`:${key}`, params[key]);
        });
        return url;
    }
}; 