// Modern JavaScript for TrophyHub Studio

// ============================================
// MOBILE MENU TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(7px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.header')) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe elements with scroll animation classes
document.querySelectorAll('.scroll-reveal, .scroll-fade-left, .scroll-fade-right, .scroll-scale').forEach(element => {
    observer.observe(element);
});

// Auto-add scroll animations to cards
document.querySelectorAll('.feature-card, .product-card, .step, .delivery-card').forEach((element, index) => {
    element.classList.add('scroll-reveal');
    element.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(element);
});

// ============================================
// CATALOG FILTER FUNCTIONALITY
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

if (filterButtons.length > 0 && productCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter products with animation
            productCards.forEach((card, index) => {
                card.style.animation = 'none';
                
                setTimeout(() => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.05}s both`;
                    } else {
                        card.style.display = 'none';
                    }
                }, 50);
            });
        });
    });
}

// ============================================
// FORM VALIDATION AND ENHANCEMENT
// ============================================
const quoteForm = document.querySelector('.quote-form form');

if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#FF4444';
                
                // Reset border color after 3 seconds
                setTimeout(() => {
                    field.style.borderColor = '';
                }, 3000);
            }
        });
        
        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #FFD700, #FFA500);
                color: #0A0A0A;
                padding: 2rem 3rem;
                border-radius: 16px;
                box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                font-weight: 700;
                font-size: 1.2rem;
                animation: scaleInBounce 0.7s ease-out;
            `;
            successMessage.textContent = '✓ Quote request submitted successfully!';
            document.body.appendChild(successMessage);
            
            // Remove message after 3 seconds
            setTimeout(() => {
                successMessage.style.animation = 'fadeOutUp 0.5s ease-out';
                setTimeout(() => {
                    document.body.removeChild(successMessage);
                }, 500);
            }, 3000);
            
            // Reset form
            this.reset();
        }
    });
    
    // Real-time validation feedback
    const inputs = quoteForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#FF4444';
            } else {
                this.style.borderColor = '#FFD700';
                setTimeout(() => {
                    this.style.borderColor = '';
                }, 1000);
            }
        });
    });
}

// ============================================
// WHATSAPP BUTTON TRACKING
// ============================================
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('WhatsApp link clicked:', this.href);
        // You can add analytics tracking here
    });
});

// ============================================
// LAZY LOADING IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// PERFORMANCE: DEBOUNCE UTILITY
// ============================================
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

// ============================================
// PRELOAD CRITICAL RESOURCES
// ============================================
window.addEventListener('load', function() {
    // Preload fonts
    const fonts = [
        'Inter',
        'Playfair Display'
    ];
    
    fonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
    });
});

// ============================================
// CURSOR EFFECTS (Optional Premium Feature)
// ============================================
const createCursorEffect = () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function(e) {
            this.style.transform = '';
        });
        
        button.addEventListener('mousedown', function(e) {
            this.style.transform = 'translateY(-2px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function(e) {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
    });
};

createCursorEffect();

// ============================================
// STATS COUNTER ANIMATION
// ============================================
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isNumber = /^\d+$/.test(target);
        
        if (isNumber) {
            const updateCounter = () => {
                const value = parseInt(target);
                const increment = value / 50;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= value) {
                        counter.textContent = value + '+';
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 30);
            };
            
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            counterObserver.observe(counter);
        }
    });
};

if (document.querySelector('.stat-number')) {
    animateCounters();
}

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate elements on page load
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-buttons');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ============================================
// IMAGE MODAL FUNCTIONALITY
// ============================================
function openModal(imageSrc, title) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    
    modal.style.display = 'block';
    modalImage.src = imageSrc;
    modalImage.alt = title;
    modalTitle.textContent = title;
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        modal.style.opacity = '1';
        modalImage.style.transform = 'scale(1)';
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modal.style.opacity = '0';
    modalImage.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Close modal when clicking outside the image or pressing Escape
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    
    if (modal) {
        // Close when clicking outside
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
        
        // Initialize modal styles
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.3s ease';
        
        const modalImage = document.getElementById('modalImage');
        if (modalImage) {
            modalImage.style.transform = 'scale(0.8)';
            modalImage.style.transition = 'transform 0.3s ease';
        }
    }
});

// ============================================
// CONSOLE BRANDING
// ============================================
console.log('%c🏆 TrophyHub Studio', 'font-size: 24px; font-weight: bold; color: #FFD700;');
console.log('%cPremium Custom Trophies & Medals', 'font-size: 14px; color: #666;');
console.log('%cWebsite developed with modern web technologies', 'font-size: 12px; color: #999; font-style: italic;');
