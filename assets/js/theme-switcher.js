document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to update the button text based on the current theme
    const updateButtonText = () => {
        if (body.classList.contains('light-mode')) {
            themeToggle.textContent = 'Dark';
        } else {
            themeToggle.textContent = 'Light';
        }
    };

    // Function to apply the saved theme on page load
    const applySavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
        }
        updateButtonText(); // Set the initial button text
    };

    // Function to toggle the theme
    const toggleTheme = () => {
        body.classList.toggle('light-mode');
        
        // Save the new theme preference
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.removeItem('theme');
        }
        
        updateButtonText(); // Update the button text after toggling
    };

    // Event listener for the toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Apply the theme and button text when the page loads
    applySavedTheme();
});