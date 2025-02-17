document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('#image-gallery img');
    images.forEach(img => {
        img.addEventListener('mouseover', () => {
            img.style.transform = 'scale(1.1)';
        });
        img.addEventListener('mouseout', () => {
            img.style.transform = 'scale(1)';
        });
    });

    const articleImages = document.querySelectorAll('article img');
    articleImages.forEach(img => {
            img.style.opacity = '0.8';
        });
        img.addEventListener('mouseout', () => {
            img.style.opacity = '1';
        });
    });
});