document.addEventListener('scroll', function() {
    const projectsSection = document.getElementById('projects');
    const scrollPosition = window.scrollY + window.innerHeight; // Current scroll position + viewport height

    // Check if the bottom of the viewport has passed the top of the Projects section
    if (scrollPosition > projectsSection.offsetTop + 200) { // Threshold to make it appear later
        projectsSection.classList.add('visible'); // Show the Projects section
    } else {
        projectsSection.classList.remove('visible'); // Hide the Projects section
    }
});