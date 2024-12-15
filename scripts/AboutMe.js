document.addEventListener('scroll', function() {
    const aboutSection = document.getElementById('about');
    const scrollPosition = window.scrollY + window.innerHeight; // Current scroll position + viewport height

    // Check if the bottom of the viewport has passed the top of the About section
    if (scrollPosition > aboutSection.offsetTop + 200) { // Threshold to make it appear later
        aboutSection.classList.add('visible'); // Show the About Me section
    } else {
        aboutSection.classList.remove('visible'); // Hide the About Me section
    }
});