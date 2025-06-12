// js/review-system.js
class ReviewSystem {
    constructor() {
        this.apiUrl = '/api/reviews';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadReviews();
    }

    bindEvents() {
        // Review form submission
        const reviewForm = document.getElementById('reviewForm');
        if (reviewForm) {
            reviewForm.addEventListener('submit', (e) => this.handleSubmitReview(e));
        }

        // Rating stars
        this.bindRatingStars();

        // Helpful buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('helpful-btn')) {
                this.toggleHelpful(e.target.dataset.reviewId);
            }
        });
    }

    bindRatingStars() {
        const stars = document.querySelectorAll('.rating-stars .star');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                this.setRating(index + 1);
            });

            star.addEventListener('mouseover', () => {
                this.highlightStars(index + 1);
            });
        });

        const ratingContainer = document.querySelector('.rating-stars');
        if (ratingContainer) {
            ratingContainer.addEventListener('mouseleave', () => {
                this.resetStarHighlight();
            });
        }
    }

    setRating(rating) {
        const ratingInput = document.getElementById('reviewRating');
        if (ratingInput) {
            ratingInput.value = rating;
        }
        this.updateStarDisplay(rating);
    }

    highlightStars(count) {
        const stars = document.querySelectorAll('.rating-stars .star');
        stars.forEach((star, index) => {
            star.classList.toggle('highlighted', index < count);
        });
    }

    resetStarHighlight() {
        const currentRating = document.getElementById('reviewRating')?.value || 0;
        this.updateStarDisplay(currentRating);
    }

    updateStarDisplay(rating) {
        const stars = document.querySelectorAll('.rating-stars .star');
        stars.forEach((star, index) => {
            star.classList.toggle('selected', index < rating);
            star.classList.remove('highlighted');
        });
    }

    async handleSubmitReview(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const reviewData = Object.fromEntries(formData);

        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(reviewData)
            });

            if (response.ok) {
                const review = await response.json();
                this.showSuccess('Review submitted successfully');
                this.addReviewToDOM(review);
                e.target.reset();
                this.setRating(0);
            } else {
                const error = await response.json();
                this.showError(error.msg || 'Failed to submit review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            this.showError('Failed to submit review');
        }
    }

    async loadReviews(menuItemId = null) {
        try {
            let url = this.apiUrl;
            if (menuItemId) {
                url += `?menuItem=${menuItemId}`;
            }

            const response = await fetch(url);
            const data = await response.json();
            this.renderReviews(data.reviews);
        } catch (error) {
            console.error('Error loading reviews:', error);
            this.showError('Failed to load reviews');
        }
    }

    renderReviews(reviews) {
        const container = document.getElementById('reviewsContainer');
        if (!container) return;

        container.innerHTML = reviews.map(review => this.renderReview(review)).join('');
    }

    renderReview(review) {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const helpfulCount = review.helpfulVotes?.length || 0;
        
        return `
            <div class="review-card" data-id="${review._id}">
                <div class="review-header">
                    <div class="reviewer-info">
                        <img src="${review.customer.profileImage || 'assets/images/default-avatar.jpg'}" 
                             alt="${review.customer.fullName}" class="reviewer-avatar">
                        <div>
                            <h4>${review.customer.fullName}</h4>
                            <div class="review-rating">${stars}</div>
                        </div>
                    </div>
                    <div class="review-date">
                        ${new Date(review.createdAt).toLocaleDateString()}
                    </div>
                </div>
                
                <div class="review-content">
                    <h5>${review.title}</h5>
                    <p>${review.comment}</p>
                    
                    ${review.images && review.images.length > 0 ? `
                        <div class="review-images">
                            ${review.images.map(img => `
                                <img src="${img}" alt="Review image" class="review-image">
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <div class="review-actions">
                    <button class="helpful-btn" data-review-id="${review._id}">
                        <i class="fas fa-thumbs-up"></i>
                        Helpful (${helpfulCount})
                    </button>
                    
                    ${review.response ? `
                        <div class="review-response">
                            <h6>Response from Management:</h6>
                            <p>${review.response.message}</p>
                            <small>Responded on ${new Date(review.response.respondedAt).toLocaleDateString()}</small>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    addReviewToDOM(review) {
        const container = document.getElementById('reviewsContainer');
        if (!container) return;

        const reviewHTML = this.renderReview(review);
        container.insertAdjacentHTML('afterbegin', reviewHTML);
    }

    async toggleHelpful(reviewId) {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                this.showError('Please login to mark reviews as helpful');
                return;
            }

            const response = await fetch(`${this.apiUrl}/${reviewId}/helpful`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                // Update helpful count in UI
                const btn = document.querySelector(`[data-review-id="${reviewId}"]`);
                if (btn) {
                    btn.innerHTML = `<i class="fas fa-thumbs-up"></i> Helpful (${data.helpfulCount})`;
                }
            } else {
                const error = await response.json();
                this.showError(error.msg || 'Failed to update helpful status');
            }
        } catch (error) {
            console.error('Error toggling helpful:', error);
            this.showError('Failed to update helpful status');
        }
    }

    showSuccess(message) {
        // Implement toast notification
        console.log('Success:', message);
    }

    showError(message) {
        // Implement error notification
        console.error('Error:', message);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.reviewSystem = new ReviewSystem();
});