import { fetchImages, fetchVideos } from './api.js';

// Load header and footer components
async function loadComponents() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    try {
        const headerResponse = await fetch('/src/components/header.html');
        const footerResponse = await fetch('/src/components/footer.html');
        
        headerPlaceholder.innerHTML = await headerResponse.text();
        footerPlaceholder.innerHTML = await footerResponse.text();
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Initialize animations and observers
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.article-card, .grid-item').forEach(item => {
        observer.observe(item);
    });
}

// Initialize smooth scrolling
function initializeSmoothScroll() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Handle contact form submission
function handleContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            console.log('Form submitted:', data);
            alert('ขอบคุณสำหรับข้อความ เราจะติดต่อกลับโดยเร็วที่สุด');
            form.reset();
        });
    }
}

// Load dynamic content
async function loadDynamicContent() {
    // Load featured articles if on home page
    const featuredArticlesGrid = document.getElementById('featured-articles-grid');
    if (featuredArticlesGrid) {
        const images = await fetchImages('health wellness', 3);
        images.forEach(photo => {
            const article = document.createElement('article');
            article.className = 'grid-item';
            article.innerHTML = `
                <img src="${photo.src.medium}" alt="${photo.alt}">
                <div class="grid-item-content">
                    <h3>เคล็ดลับสุขภาพดี</h3>
                    <p>เรียนรู้วิธีการดูแลสุขภาพแบบองค์รวม...</p>
                    <a href="/src/pages/articles.html" class="read-more">อ่านเพิ่มเติม</a>
                </div>
            `;
            featuredArticlesGrid.appendChild(article);
        });
    }

    // Add similar loading logic for recipes and videos...
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Initialize all features
    await loadComponents();
    initializeAnimations();
    initializeSmoothScroll();
    handleContactForm();
    await loadDynamicContent();
});

export { loadComponents, handleContactForm };