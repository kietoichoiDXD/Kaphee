// API Configuration
const API_URL = 'http://localhost:5000/api';
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_data';

// Token Management
const TokenManager = {
    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },

    setTokens(token, refreshToken) {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    },

    clearTokens() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },

    getUser() {
        const userData = localStorage.getItem(USER_KEY);
        return userData ? JSON.parse(userData) : null;
    },

    setUser(user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
};

// API Service
const ApiService = {
    async request(endpoint, options = {}) {
        const token = TokenManager.getToken();
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                headers
            });

            // Handle token expiration
            if (response.status === 401) {
                const error = await response.json();
                if (error.code === 'TOKEN_EXPIRED') {
                    const newTokens = await this.refreshToken();
                    if (newTokens) {
                        // Retry the original request with new token
                        return this.request(endpoint, options);
                    }
                }
            }

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            return data;
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    },

    async refreshToken() {
        try {
            const refreshToken = TokenManager.getRefreshToken();
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await fetch(`${API_URL}/auth/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refreshToken })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to refresh token');
            }

            TokenManager.setTokens(data.data.token, data.data.refreshToken);
            return data.data;
        } catch (error) {
            console.error('Token refresh error:', error);
            TokenManager.clearTokens();
            window.location.href = '/login.html';
            return null;
        }
    }
};

// Auth Service
const AuthService = {
    async login(email, password) {
        try {
            const data = await ApiService.request('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            TokenManager.setTokens(data.data.token, data.data.refreshToken);
            TokenManager.setUser(data.data.user);
            return data;
        } catch (error) {
            throw error;
        }
    },

    async register(name, email, password) {
        try {
            const data = await ApiService.request('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password })
            });

            TokenManager.setTokens(data.data.token, data.data.refreshToken);
            TokenManager.setUser(data.data.user);
            return data;
        } catch (error) {
            throw error;
        }
    },

    async logout() {
        try {
            await ApiService.request('/auth/logout', {
                method: 'POST'
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            TokenManager.clearTokens();
        }
    },

    async getCurrentUser() {
        try {
            const data = await ApiService.request('/auth/me');
            TokenManager.setUser(data.data);
            return data.data;
        } catch (error) {
            throw error;
        }
    },

    isAuthenticated() {
        return !!TokenManager.getToken();
    }
};

// UI Components
const AuthUI = {
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '5px';
        notification.style.color = '#fff';
        notification.style.zIndex = '1000';
        notification.style.animation = 'slideIn 0.5s ease-out';
        
        switch(type) {
            case 'success':
                notification.style.backgroundColor = '#4CAF50';
                break;
            case 'error':
                notification.style.backgroundColor = '#f44336';
                break;
            default:
                notification.style.backgroundColor = '#2196F3';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    },

    setLoading(isLoading) {
        const submitButton = document.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = isLoading;
            submitButton.textContent = isLoading ? 'Loading...' : 'Submit';
        }
    }
};

// Event Handlers
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    // Toggle password visibility
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = passwordInput.value;
            
            try {
                AuthUI.setLoading(true);
                await AuthService.login(email, password);
                AuthUI.showNotification('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = '/dashboard.html';
                }, 1500);
            } catch (error) {
                AuthUI.showNotification(error.message || 'Login failed', 'error');
            } finally {
                AuthUI.setLoading(false);
            }
        });
    }

    // Handle register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                AuthUI.setLoading(true);
                await AuthService.register(name, email, password);
                AuthUI.showNotification('Registration successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = '/dashboard.html';
                }, 1500);
            } catch (error) {
                AuthUI.showNotification(error.message || 'Registration failed', 'error');
            } finally {
                AuthUI.setLoading(false);
            }
        });
    }

    // Check authentication status
    if (AuthService.isAuthenticated()) {
        const publicPages = ['/login.html', '/register.html'];
        if (publicPages.includes(window.location.pathname)) {
            window.location.href = '/dashboard.html';
        }
    } else {
        const protectedPages = ['/dashboard.html', '/admin.html'];
        if (protectedPages.includes(window.location.pathname)) {
            window.location.href = '/login.html';
        }
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 