// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const passwordToggle = document.querySelector('.password-toggle i');

// Basic notification function (assuming you have one)
function showNotification(message, type) {
    console.log(`Notification (${type}): ${message}`);
    // Implement your actual notification display logic here
}

// Toggle password visibility
if (passwordToggle) {
    passwordToggle.addEventListener('click', () => {
        const passwordInput = passwordToggle.previousElementSibling;
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        passwordToggle.classList.toggle('fa-eye-slash');
        passwordToggle.classList.toggle('fa-eye');
    });
}

// Handle Login Form Submission
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const credentials = Object.fromEntries(formData);

        try {
            const response = await authApi.login(credentials);

            if (response.token) {
                // Assuming the backend sends a user object with a role
                if (response.user && response.user.role === 'admin') {
                    localStorage.setItem('adminToken', response.token);
                    showNotification('Admin login successful!', 'success');
                    // Redirect to admin dashboard
                    window.location.href = 'admin-dashboard.html';
                } else {
                    // Handle regular user login or show error
                    showNotification('Login successful (not an admin). Token stored.', 'success');
                    // Optional: Redirect regular users
                    // window.location.href = 'dashboard.html';
                }
            } else {
                showNotification('Login failed. Invalid credentials.', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            showNotification('An error occurred during login.', 'error');
        }
    });
}

// Handle Register Form Submission (Basic Implementation)
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData);

        // Basic validation (can be enhanced)
        if (userData.password !== userData.confirmPassword) {
            showNotification('Passwords do not match!', 'error');
            return;
        }

        try {
            const response = await authApi.register(userData);
            showNotification('Registration successful!', 'success');
            // Optional: Redirect to login page after successful registration
            // window.location.href = 'login.html';
        } catch (error) {
            console.error('Registration error:', error);
            showNotification('An error occurred during registration.', 'error');
        }
    });
} 