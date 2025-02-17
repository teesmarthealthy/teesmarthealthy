import { contentAPI } from './api.js';

class Gallery {
    constructor() {
        this.currentPage = 1;
        this.imagesPerPage = 12;
    }

    // Initialize gallery with images from Pexels
    async initializeGallery(containerId, searchQuery) {
        const container = document.getElementById(containerId);
        if (!container) return;

        try {
            const images = await contentAPI.searchPexelsImages(searchQuery, this.imagesPerPage);
            this.renderGallery(container, images.photos);
        } catch (error) {
            console.error('Failed to initialize gallery:', error);
            container.innerHTML = '<p>Failed to load gallery. Please try again later.</p>';
        }
    }

    // Render gallery images
    renderGallery(container, images) {
        container.innerHTML = images.map(image => `
            <div class="gallery-item" data-id="${image.id}">
                <img src="${image.src.medium}" 
                     alt="${image.alt || 'Gallery image'}"
                     loading="lazy">
                <div class="gallery-item-info">
                    <h3>${image.photographer}</h3>
                    <a href="${image.url}" target="_blank" rel="noopener">View on Pexels</a>
                </div>
            </div>
        `).join('');

        this.addGalleryEventListeners(container);
    }

    // Add event listeners to gallery items
    addGalleryEventListeners(container) {
        container.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                this.openLightbox(item.dataset.id);
            });
        });
    }

    // Lightbox functionality
    openLightbox(imageId) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="close-button">&times;</button>
                <img src="${this.getFullSizeImage(imageId)}" alt="Full size image">
            </div>
        `;

        document.body.appendChild(lightbox);
        this.addLightboxEventListeners(lightbox);
    }

    // Get full size image URL
    getFullSizeImage(imageId) {
        // Implementation depends on your data structure
        return `https://api.pexels.com/v1/photos/${imageId}`;
    }

    // Add lightbox event listeners
    addLightboxEventListeners(lightbox) {
        lightbox.querySelector('.close-button').addEventListener('click', () => {
            lightbox.remove();
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.remove();
            }
        });
    }

    // Load more images
    async loadMore(containerId, searchQuery) {
        this.currentPage++;
        const container = document.getElementById(containerId);
        if (!container) return;

        try {
            const images = await contentAPI.searchPexelsImages(
                searchQuery, 
                this.imagesPerPage, 
                this.currentPage
            );
            this.appendImages(container, images.photos);
        } catch (error) {
            console.error('Failed to load more images:', error);
        }
    }

    // Append new images to existing gallery
    appendImages(container, images) {
        const newImages = images.map(image => `
            <div class="gallery-item" data-id="${image.id}">
                <img src="${image.src.medium}" 
                     alt="${image.alt || 'Gallery image'}"
                     loading="lazy">
                <div class="gallery-item-info">
                    <h3>${image.photographer}</h3>
                    <a href="${image.url}" target="_blank" rel="noopener">View on Pexels</a>
                </div>
            </div>
        `).join('');

        container.insertAdjacentHTML('beforeend', newImages);
        this.addGalleryEventListeners(container);
    }
}

export const gallery = new Gallery();