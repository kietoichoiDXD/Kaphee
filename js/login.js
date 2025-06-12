document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    // Check if user is already logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
        verifyToken(token);
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/auth/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Store token and user data
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminUser', JSON.stringify(data.user));

            // Redirect to admin dashboard
            window.location.href = '/admin-dashboard.html';
        } catch (error) {
            showError(error.message);
        }
    });
});

async function verifyToken(token) {
    try {
        const response = await fetch('/api/auth/verify', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok && data.valid) {
            window.location.href = '/admin-dashboard.html';
        } else {
            // Clear invalid token
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
        }
    } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
    }
}

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
} 