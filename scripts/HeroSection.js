document.addEventListener('DOMContentLoaded', function() {
    // Array of phrases to display
    const phrases = [
        "Future ICT Professional",
        "IT Management",
        "Technological University Dublin",
        "Welcome to My Portfolio"
    ];

    let currentPhraseIndex = 0; // Index to track the current phrase
    const changingTextElement = document.getElementById('changingText'); // Get the changing text element

    // Function to change the text with fade effects
    function changeText() {
        // Create a new span element for the new text
        const newText = document.createElement('span');
        newText.textContent = phrases[currentPhraseIndex];
        newText.classList.add('fade-text'); // Add class for styling
        changingTextElement.appendChild(newText); // Append the new text

        // Trigger the fade-in effect
        setTimeout(() => {
            newText.classList.add('show'); // Show the new text span
        }, 50); // Small delay to ensure the new text is added before showing

        // Wait for the transition to complete before changing the text
        setTimeout(() => {
            newText.classList.remove('show'); // Hide the new text span

            // Update the current phrase index
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length; // Move to the next phrase

            // Remove the old text after the transition
            setTimeout(() => {
                changingTextElement.removeChild(changingTextElement.firstChild); // Remove the old text
            }, 800); // Match this duration with the CSS transition duration
        }, 3000); // Keep the text visible for 3 seconds
    }

    // Initial call to set the first phrase immediately
    changeText();
    // Change text every 4 seconds
    setInterval(changeText, 4000); // Increase interval to allow for reading
});