document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTopBtn');

    // Function to handle scroll event
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }

    // Function to scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Add event listeners
    window.addEventListener('scroll', toggleBackToTopButton);
    backToTopButton.addEventListener('click', scrollToTop);
});