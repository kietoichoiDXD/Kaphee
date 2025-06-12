// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Simple email validation
        if (validateEmail(email)) {
            // Store in localStorage (simulating backend)
            const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
            subscribers.push(email);
            localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
            
            // Show success message
            showNotification('Thank you for subscribing!', 'success');
            newsletterForm.reset();
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// Email validation helper
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.color = '#fff';
    notification.style.zIndex = '1000';
    notification.style.animation = 'slideIn 0.5s ease-out';
    
    // Set background color based on type
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
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

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

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
}

// Gallery image hover effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Check if user is logged in and update UI
function updateUIBasedOnAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // Select navigation links by their href or content
    const navLinks = document.querySelectorAll('.nav-links a');
    const heroBookTableBtn = document.querySelector('.hero-buttons .book-table');
    const bookingSection = document.getElementById('bookingSection'); // Still using ID for the section

    navLinks.forEach(link => {
        // Determine which link this is by its href or text content
        const href = link.getAttribute('href');
        const text = link.textContent.trim();

        if (href === 'login.html') {
            if (isLoggedIn) {
                link.style.display = 'none'; // Hide Login link if logged in
            } else {
                link.style.display = ''; // Show Login link if not logged in
            }
        } else if (href === 'dashboard.html') {
             if (isLoggedIn) {
                link.style.display = ''; // Show Dashboard link if logged in
            } else {
                link.style.display = 'none'; // Hide Dashboard link if not logged in
            }
        } else if (href === 'booking.html') {
             if (isLoggedIn) {
                link.style.display = ''; // Show Book a Table link if logged in
            } else {
                link.style.display = 'none'; // Hide Book a Table link if not logged in
            }
        } else {
            // For other links (Home, Menu, About Us), always show them
            link.style.display = '';
        }
    });

    // Handle the 'Book a Table' button in the hero section (index.html)
    if (heroBookTableBtn) {
        if (isLoggedIn) {
            heroBookTableBtn.style.display = 'inline-block';
        } else {
            heroBookTableBtn.style.display = 'none';
        }
    }
    
    // Handle the entire booking section content on booking.html
    if (bookingSection) {
        if (isLoggedIn) {
            bookingSection.style.display = 'block'; // Or appropriate display type
        } else {
            // Option 1: Redirect to login page
            // window.location.href = 'login.html';
             
            // Option 2: Display a message (less ideal for restricted access)
            bookingSection.innerHTML = '<div style="text-align: center; padding: 50px;"><h2>Please log in to book a table.</h2><p><a href="login.html">Go to Login</a></p></div>';
            bookingSection.style.display = 'block'; // Show the message container
        }
    }
}

// Run UI update on page load and potentially after auth state changes
document.addEventListener('DOMContentLoaded', updateUIBasedOnAuth);

// Assuming login/logout logic in auth.js will also call updateUIBasedOnAuth() after state change.

// Video handling
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.video-container video');
    
    // Check if the current page is NOT a login or register page
    const isAuthPage = window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html');

    if (video && !isAuthPage) {
        // Ensure video plays on mobile devices
        video.addEventListener('loadeddata', function() {
            video.play().catch(function(error) {
                console.log("Video autoplay failed:", error);
            });
        });

        // Pause video when it's not in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(function(error) {
                        console.log("Video play failed:", error);
                    });
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(video);
    } else if (video && isAuthPage) {
        // For auth pages, just ensure video plays
         video.play().catch(function(error) {
            console.log("Video autoplay failed on auth page:", error);
        });
    }
}); 