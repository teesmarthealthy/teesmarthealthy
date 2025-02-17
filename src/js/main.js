// filepath: /teesmarthealthy/teesmarthealthy/src/js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    console.log("Application initialized");

    // Set up event listeners for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetPage = event.target.getAttribute('href');
            loadPage(targetPage);
        });
    });

    // Function to load pages dynamically
    function loadPage(page) {
        fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                document.body.innerHTML = html;
                // Re-initialize event listeners for the new page
                initializePage();
            })
            .catch(error => {
                console.error('Error loading page:', error);
            });
    }

    // Function to re-initialize page-specific functionality
    function initializePage() {
        // Add any page-specific initialization here
        console.log("Page initialized");
    }
});