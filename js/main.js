/**
 * TrophyHub Studio - Main JavaScript
 * Handles interactions, animations, and dynamic functionality
 */

(function() {
    'use strict';

    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================

    /**
     * Debounce function to limit rate of function execution
     */
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

    /**
     * Check if element is in viewport
     */
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // ==========================================
    // STICKY HEADER WITH SHADOW ON SCROLL
    // ==========================================

    function initStickyHeader() {
        const header = document.querySelector('.header');
        if (!header) return;

        function updateHeaderShadow() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
        }

        window.addEventListener('scroll', debounce(updateHeaderShadow, 10));
        updateHeaderShadow();
    }

    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================

    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            revealElements.forEach(element => {
                observer.observe(element);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            revealElements.forEach(element => {
                element.classList.add('revealed');
            });
        }
    }

    // ==========================================
    // ANIMATED COUNTER FOR STATISTICS
    // ==========================================

    function animateCounter(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = formatNumber(end);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(current));
            }
        }, 16);
    }

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function initCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        
        if (!counters.length) return;

        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const endValue = parseInt(counter.getAttribute('data-counter'));
                    const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
                    
                    animateCounter(counter, 0, endValue, duration);
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================

    function initBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top');
        if (!backToTopBtn) return;

        function toggleBackToTop() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', debounce(toggleBackToTop, 100));
        
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        toggleBackToTop();
    }

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================

    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || href === '#top') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ==========================================
    // MOBILE MENU TOGGLE (if needed)
    // ==========================================

    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav');
        
        if (!menuToggle || !nav) return;

        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // ==========================================
    // LAZY LOAD IMAGES
    // ==========================================

    function initLazyLoad() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback - load all images
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // ==========================================
    // TESTIMONIAL SLIDER (if implemented)
    // ==========================================

    function initTestimonialSlider() {
        const slider = document.querySelector('.testimonial-slider');
        if (!slider) return;

        // Simple slider implementation
        // This can be expanded or replaced with a library like Swiper.js
    }

    // ==========================================
    // NEWSLETTER FORM VALIDATION
    // ==========================================

    function initNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }

            // Here you would typically send to your backend
            showMessage('Thank you for subscribing!', 'success');
            form.reset();
        });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showMessage(message, type) {
        // Simple message display - can be enhanced
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#22C55E' : '#EF4444'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        `;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => messageEl.remove(), 300);
        }, 3000);
    }

    // ==========================================
    // FAQ ACCORDION
    // ==========================================

    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (!question) return;

            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active', !isActive);
            });
        });
    }

    // ==========================================
    // INITIALIZE ALL FEATURES ON PAGE LOAD
    // ==========================================

    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Initialize all features
        initStickyHeader();
        initScrollReveal();
        initCounters();
        initBackToTop();
        initSmoothScroll();
        initMobileMenu();
        initLazyLoad();
        initTestimonialSlider();
        initNewsletterForm();
        initFAQ();

        // Add loaded class to body
        document.body.classList.add('loaded');
    }

    // Start initialization
    init();

})();
