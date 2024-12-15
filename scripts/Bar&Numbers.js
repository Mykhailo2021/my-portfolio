document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.progress-bar');
    const progressNumbers = document.querySelectorAll('.progress-number');

    // Create an array to track current progress
    const progressState = Array.from(skillBars).map((bar, index) => ({
        bar,
        numberElement: progressNumbers[index],
        targetValue: parseInt(bar.getAttribute('data-value')),
        currentValue: 0,
        numberCurrentValue: 0,
        numberSpeed: 0.3, // Slightly slower speed for more gradual progression
        isFullyAnimated: false // Flag to track if animation is complete
    }));

    let isAnimating = false;

    function animateProgress(isIncreasing) {
        // Prevent multiple simultaneous animations
        if (isAnimating) return;
        isAnimating = true;

        function animate() {
            let allComplete = true;

            progressState.forEach(item => {
                // Skip if already fully animated and increasing
                if (item.isFullyAnimated && isIncreasing) return;

                const { targetValue, numberSpeed } = item;
                
                // Bar progression
                const barStep = isIncreasing 
                    ? Math.min(item.currentValue + 1, targetValue)   // Increase
                    : Math.max(item.currentValue - 1, 0);            // Decrease

                // Number progression with more precise and gradual increase
                const numberStep = isIncreasing 
                    ? Math.min(
                        item.numberCurrentValue + numberSpeed, 
                        targetValue
                    )   // Increase more slowly
                    : Math.max(
                        item.numberCurrentValue - numberSpeed, 
                        0
                    );            // Decrease

                // Update current values
                item.currentValue = barStep;
                item.numberCurrentValue = numberStep;

                // Update bar and number
                item.bar.style.width = `${barStep}%`;
                item.numberElement.textContent = `${Math.round(numberStep)}%`;

                // Check if this specific item is complete
                const isBarComplete = isIncreasing 
                    ? barStep >= targetValue 
                    : barStep <= 0;

                const isNumberComplete = isIncreasing 
                    ? Math.round(numberStep) >= targetValue 
                    : numberStep <= 0;

                // Mark as fully animated if reached target
                if (isIncreasing && isBarComplete && isNumberComplete) {
                    item.isFullyAnimated = true;
                    item.currentValue = targetValue;
                    item.numberCurrentValue = targetValue;
                    item.bar.style.width = `${targetValue}%`;
                    item.numberElement.textContent = `${targetValue}%`;
                }

                // If not complete, we need to continue animating
                if (!isBarComplete || !isNumberComplete) {
                    allComplete = false;
                }
            });

            // Continue animation or stop
            if (!allComplete) {
                requestAnimationFrame(animate);
            } else {
                isAnimating = false;
            }
        }

        // Start animation
        requestAnimationFrame(animate);
    }

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function checkScroll() {
        const allBarsInView = Array.from(skillBars).some(isInViewport);
        const allBarsOutOfView = Array.from(skillBars).every(bar => !isInViewport(bar));
    
        if (allBarsInView) {
            // Only increase if not fully animated
            if (progressState.some(item => !item.isFullyAnimated)) {
                animateProgress(true);
            }
        } else if (allBarsOutOfView) {
            // Reset fully animated flag when out of view
            progressState.forEach(item => {
                item.isFullyAnimated = false;
                item.currentValue = 0;
                item.numberCurrentValue = 0;
                item.bar.style.width = '0%';
                item.numberElement.textContent = '0%';
            });

            // Decrease if not at zero
            if (progressState.some(item => item.currentValue > 0)) {
                animateProgress(false);
            }
        }
    }

    // Debounce scroll event
    let scrollCheckTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollCheckTimeout);
        scrollCheckTimeout = setTimeout(checkScroll, 100);
    });

    // Initial check
    checkScroll();
});