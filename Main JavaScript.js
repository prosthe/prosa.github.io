// Main JavaScript file for common functionality

class PROSAWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupCounters();
        this.setupTabSystems();
        this.setupFormSubmissions();
    }

    setupMobileMenu() {
        const menuBtn = document.getElementById('mobileMenuBtn');
        const mainNav = document.querySelector('.main-nav');

        if (menuBtn && mainNav) {
            menuBtn.addEventListener('click', () => {
                mainNav.classList.toggle('active');
                menuBtn.classList.toggle('active');
            });
        }
    }

    setupSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupCounters() {
        const counters = document.querySelectorAll('.number[data-count]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    setupTabSystems() {
        // Tab systems for programs, get involved, etc.
        document.querySelectorAll('.nav-tab, .option-tab, .category-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabContainer = tab.closest('.nav-tabs, .options-nav, .category-tabs');
                const contentContainer = tabContainer.nextElementSibling;

                // Remove active class from all tabs
                tabContainer.querySelectorAll('.nav-tab, .option-tab, .category-tab').forEach(t => {
                    t.classList.remove('active');
                });

                // Add active class to clicked tab
                tab.classList.add('active');

                // Show corresponding content
                if (contentContainer) {
                    const targetId = tab.getAttribute('data-tab') ||
                        tab.getAttribute('data-option') ||
                        tab.getAttribute('data-category');
                    const targetContent = contentContainer.querySelector(`#${targetId}`);

                    if (targetContent) {
                        contentContainer.querySelectorAll('.tab-content, .option-content').forEach(content => {
                            content.classList.remove('active');
                        });
                        targetContent.classList.add('active');
                    }
                }
            });
        });
    }

    setupFormSubmissions() {
        // Global form submission handler
        document.addEventListener('submit', (e) => {
            if (e.target.tagName === 'FORM') {
                e.preventDefault();
                this.handleFormSubmission(e.target);
            }
        });
    }

    handleFormSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        form.classList.add('loading');

        // Simulate API call
        setTimeout(() => {
            this.showMessage('Thank you for your submission! We will get back to you soon.', 'success');

            // Reset form
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.classList.remove('loading');
        }, 2000);
    }

    showMessage(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 5000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PROSAWebsite();
});

// Utility functions
const Utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Format date
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Validate email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};
