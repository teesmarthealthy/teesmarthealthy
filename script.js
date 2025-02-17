const pexelsApiKey = 'Ducjg6pUZm37ckuhio7CoWJ3FkqsGaWRu8Vf79RYoYqYf4Tn903qxane';

class ContentManager {
  constructor() {
    this.modal = this.createModal();
  }

  async fetchContent(query, type = 'photos', perPage = 9) {
    try {
      const response = await fetch(`https://api.pexels.com/v1/${type}/search?query=${query}&per_page=${perPage}`, {
        headers: { 'Authorization': pexelsApiKey }
      });
      const data = await response.json();
      return type === 'photos' ? data.photos : data.videos;
    } catch (error) {
      console.error('Error fetching content:', error);
      return [];
    }
  }

  createCard(content, type = 'article') {
    const card = document.createElement('div');
    card.className = 'card';
    // Card content implementation
    return card;
  }

  createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    document.body.appendChild(modal);
    return modal;
  }

  showModal(content) {
    this.modal.innerHTML = content;
    this.modal.style.display = 'flex';
  }

  // Add more methods for content management
}

// Initialize content manager
const contentManager = new ContentManager();

// Event listeners and initializations
document.addEventListener('DOMContentLoaded', () => {
  // Implementation
});