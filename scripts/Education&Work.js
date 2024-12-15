document.addEventListener('scroll', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const windowHeight = window.innerHeight;

    timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        
        // If the entire item is below the viewport, remove visible class
        if (rect.top > windowHeight) {
            item.classList.remove('visible');
        } 
        // If any part of the item is in the viewport, add visible class
        else if (
            rect.top < windowHeight && 
            rect.bottom >= 0
        ) {
            item.classList.add('visible');
        }
    });
});