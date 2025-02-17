import { gallery } from './gallery.js';
import { contentAPI } from './api.js';

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
                initializePage();
            })
            .catch(error => {
                console.error('Error loading page:', error);
            });
    }

    // Function to re-initialize page-specific functionality
    function initializePage() {
        const currentPage = window.location.pathname;

        // Initialize galleries based on page
        if (currentPage.includes('recipes.html')) {
            gallery.initializeGallery('recipe-gallery', 'healthy food recipes');
        } else if (currentPage.includes('articles.html')) {
            gallery.initializeGallery('article-gallery', 'healthy lifestyle');
        }

        // Initialize load more buttons if they exist
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                const galleryId = loadMoreBtn.dataset.galleryId;
                const searchQuery = loadMoreBtn.dataset.searchQuery;
                gallery.loadMore(galleryId, searchQuery);
            });
        }
    }

    // Initial page initialization
    initializePage();
});