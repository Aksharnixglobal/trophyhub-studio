/**
 * TrophyHub Studio - Catalog Filter
 * Handles product filtering functionality
 */

(function() {
    'use strict';

    function initCatalogFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('.product-card');

        if (!filterButtons.length || !productCards.length) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter products
                productCards.forEach(card => {
                    const categories = card.getAttribute('data-category');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCatalogFilter);
    } else {
        initCatalogFilter();
    }

})();
