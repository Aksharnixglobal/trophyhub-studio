/**
 * TrophyHub Studio - WhatsApp Quote Form Handler
 * Handles form validation and WhatsApp integration
 */

(function() {
    'use strict';

    function initQuoteForm() {
        const form = document.getElementById('quoteForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const productType = document.getElementById('productType').value;
            const quantity = document.getElementById('quantity').value;
            const eventType = document.getElementById('eventType').value;
            const eventDate = document.getElementById('eventDate').value;
            const engraving = document.querySelector('input[name="engraving"]:checked')?.value || 'Yes';
            const delivery = document.querySelector('input[name="delivery"]:checked')?.value || 'Pickup';
            const message = document.getElementById('message').value.trim();

            // Validate required fields
            if (!name || !phone || !productType || !quantity || !eventType) {
                showError('Please fill in all required fields.');
                return;
            }

            // Build WhatsApp message
            let whatsappMessage = `Hi TrophyHub Studio,\n\n`;
            whatsappMessage += `I'd like to request a custom quote:\n\n`;
            whatsappMessage += `📝 Name: ${name}\n`;
            whatsappMessage += `📞 Phone: ${phone}\n\n`;
            whatsappMessage += `Product Type: ${productType}\n`;
            whatsappMessage += `Quantity: ${quantity}\n`;
            whatsappMessage += `Event Type: ${eventType}\n`;
            
            if (eventDate) {
                whatsappMessage += `Event Date: ${eventDate}\n`;
            }
            
            whatsappMessage += `Custom Engraving: ${engraving}\n`;
            whatsappMessage += `Delivery: ${delivery}\n`;
            
            if (message) {
                whatsappMessage += `\n💬 Additional Details:\n${message}\n`;
            }
            
            whatsappMessage += `\nThank you!`;

            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/17737506813?text=${encodedMessage}`;

            // Open WhatsApp
            window.open(whatsappURL, '_blank');
        });
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #EF4444;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => errorDiv.remove(), 300);
        }, 3000);
    }

    // Phone number formatting
    function initPhoneFormatting() {
        const phoneInput = document.getElementById('phone');
        if (!phoneInput) return;

        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            
            e.target.value = value;
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initQuoteForm();
            initPhoneFormatting();
        });
    } else {
        initQuoteForm();
        initPhoneFormatting();
    }

})();
