// Contact Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactBtn = document.getElementById('contact-btn');
    const contactModal = document.getElementById('contact-modal');
    const closeButtons = document.querySelectorAll('.close');

    // Open contact modal when button is clicked
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            contactModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modals when close button is clicked
    closeButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modal = document.querySelector('.modal[style*="display: block"]');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
});
