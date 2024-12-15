document.addEventListener('scroll', function() {
    const skillsTextSection = document.querySelector('.skills-text-section');
    const scrollPosition = window.scrollY + window.innerHeight; // Current scroll position + viewport height

    // Check if the bottom of the viewport has passed the top of the Skills text section
    if (scrollPosition > skillsTextSection.offsetTop + 100) { // Threshold to make it appear later
        skillsTextSection.classList.add('visible'); // Show the Skills text section
    } else {
        skillsTextSection.classList.remove('visible'); // Hide the Skills text section
    }
});