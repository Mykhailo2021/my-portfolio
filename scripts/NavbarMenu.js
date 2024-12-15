document.getElementById('menuToggle').addEventListener('click', function() {
    const offcanvasMenu = document.getElementById('offcanvasMenu');
    offcanvasMenu.classList.toggle('active'); // Toggle the active class to slide it in/out
});

document.getElementById('offcanvasClose').addEventListener('click', function() {
    const offcanvasMenu = document.getElementById('offcanvasMenu');
    offcanvasMenu.classList.remove('active'); // Remove the active class to slide it out
});

// Close the offcanvas menu when clicking outside of it
document.addEventListener('click', function(event) {
    const offcanvasMenu = document.getElementById('offcanvasMenu');
    const menuToggle = document.getElementById('menuToggle');

    // Check if the click was outside the menu and the toggle button
    if (!offcanvasMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        offcanvasMenu.classList.remove('active'); // Close the menu
    }
});

// Function to handle smooth scrolling
function smoothScroll(targetId) {
    const targetSection = document.querySelector(targetId); // Select the target section
    const navbarHeight = document.querySelector('.custom-navbar').offsetHeight; // Get the navbar height

    // Scroll to the target section, adjusting for the navbar height
    window.scrollTo({
        top: targetSection.offsetTop - navbarHeight, // Adjust scroll position
        behavior: 'smooth' // Smooth scroll
    });
}

// Add event listeners to nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor click behavior
        const targetId = this.getAttribute('href'); // Get the target section ID
        smoothScroll(targetId); // Call the smooth scroll function
    });
});

// Add event listeners to parallax titles
document.querySelectorAll('.parallax-title').forEach(title => {
    title.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor click behavior
        const targetId = this.getAttribute('href'); // Get the target section ID
        smoothScroll(targetId); // Call the smooth scroll function
    });
});