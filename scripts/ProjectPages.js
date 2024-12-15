let currentPage = 1;
const totalPages = 3;
let autoScrollInterval;
let isModalOpen = false;
let isChangingPage = false;

function updatePageIndicators() {
    const indicators = document.querySelectorAll('.page-indicator');
    indicators.forEach(indicator => {
        if (parseInt(indicator.getAttribute('data-page')) === currentPage) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function changePage(direction, speed = 300) {
    // Prevent page change if modal is open or page is currently changing
    if (isModalOpen || isChangingPage) return;

    // Get current and next page elements
    const currentPageElement = document.getElementById(`projectsPage${currentPage}`);
    const nextPage = getNextPage(direction);
    const newPageElement = document.getElementById(`projectsPage${nextPage}`);

    // Set changing flag
    isChangingPage = true;

    // Immediate hide and show with minimal transition
    currentPageElement.style.opacity = '0';
    newPageElement.style.opacity = '1';

    setTimeout(() => {
        // Hide current page
        currentPageElement.style.display = 'none';
        
        // Show new page
        newPageElement.style.display = 'grid';

        // Update current page
        currentPage = nextPage;
        updatePageIndicators();

        // Reset changing flag
        setTimeout(() => {
            isChangingPage = false;
        }, 150);
    }, speed);

    // Reset auto-scroll timer
    resetAutoScroll();
}

function getNextPage(direction) {
    let nextPage = currentPage + direction;
    if (nextPage < 1) return totalPages;
    if (nextPage > totalPages) return 1;
    return nextPage;
}

function startAutoScroll() {
    // Clear any existing intervals
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
    }

    // Create a new interval
    autoScrollInterval = setInterval(() => {
        // Only auto-scroll if no modal is open and not currently changing page
        if (!isModalOpen && !isChangingPage) {
            changePage(1, 300);
        }
    }, 7500); // Increased interval to 7.5 seconds
}

function resetAutoScroll() {
    // Clear existing interval
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
    }
    
    // Restart auto-scroll
    startAutoScroll();
}

document.addEventListener('DOMContentLoaded', () => {
    // Add transition style to projects pages
    const projectPages = document.querySelectorAll('[id^="projectsPage"]');
    projectPages.forEach(page => {
        page.style.transition = 'opacity 300ms ease-in-out';
        page.style.opacity = '1';
    });

    currentPage = 1;
    
    // Hide all pages except the first
    for (let i = 1; i <= totalPages; i++) {
        const pageElement = document.getElementById(`projectsPage${i}`);
        if (i === 1) {
            pageElement.style.display = 'grid';
            pageElement.style.opacity = '1';
        } else {
            pageElement.style.display = 'none';
            pageElement.style.opacity = '0';
        }
    }
    
    updatePageIndicators();

    // Delay the start of auto-scroll to ensure everything is set up
    setTimeout(() => {
        startAutoScroll();
    }, 1000);

    // Add event listeners to all project modals
    const projectModals = document.querySelectorAll('[id^="projectModal"]');
    projectModals.forEach(modal => {
        modal.addEventListener('show.bs.modal', () => {
            isModalOpen = true;
            document.body.style.overflow = 'hidden';
            clearInterval(autoScrollInterval);
        });

        modal.addEventListener('hidden.bs.modal', () => {
            isModalOpen = false;
            document.body.style.overflow = 'auto';
            startAutoScroll();
        });
    });
});

// Pointer (Mouse/Touch) Interaction
const projectsSection = document.getElementById('projects');
let startX = 0;
let endX = 0;

projectsSection.addEventListener('mousedown', (e) => {
    startX = e.clientX;
});

projectsSection.addEventListener('mouseup', (e) => {
    endX = e.clientX;
    handleSwipe();
});

// Touch events for mobile
projectsSection.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
}, { passive: true });

projectsSection.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    if (isModalOpen || isChangingPage) return;

    const threshold = 40; // Slightly increased threshold
    const direction = startX > endX ? 1 : -1;

    if (Math.abs(startX - endX) > threshold) {
        // Moderate speed for pointer interactions
        changePage(direction, 200);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (event) => {
    if (!isModalOpen) {
        if (event.key === 'ArrowRight') {
            changePage(1, 250);
        } else if (event.key === 'ArrowLeft') {
            changePage(-1, 250);
        }
    }
});

// Click on indicators
document.querySelectorAll('.page-indicator').forEach(indicator => {
    indicator.addEventListener('click', () => {
        if (isModalOpen || isChangingPage) return;

        const targetPage = parseInt(indicator.getAttribute('data-page'));
        const direction = targetPage > currentPage ? 1 : -1;
        
        changePage(direction, 250);
    });
});