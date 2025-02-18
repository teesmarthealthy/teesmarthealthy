const pexelsApiKey = 'Ducjg6pUZm37ckuhio7CoWJ3FkqsGaWRu8Vf79RYoYqYf4Tn903qxane';
createCard(content, type = 'article') {
  const card = document.createElement('div');
  card.className = 'card';

  if (type === 'photo') {
      // Create photo card
      const img = document.createElement('img');
      img.src = content.src.medium; // Use medium-sized image
      img.alt = content.alt || 'Image';
      card.appendChild(img);

      const title = document.createElement('h3');
      title.textContent = content.alt || 'No Title';
      card.appendChild(title);
  } else if (type === 'video') {
      // Create video card
      const video = document.createElement('video');
      video.src = content.video_files[0].link; // Use the first video file
      video.controls = true;
      video.style.width = '100%';
      card.appendChild(video);

      const title = document.createElement('h3');
      title.textContent = content.url || 'No Title';
      card.appendChild(title);
  }

  return card;
}
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
createCard(content, type = 'article') {
  const card = document.createElement('div');
  card.className = 'card';

  if (type === 'photo') {
      // Create photo card
      const img = document.createElement('img');
      img.src = content.src.medium; // Use medium-sized image
      img.alt = content.alt || 'Image';
      card.appendChild(img);

      const title = document.createElement('h3');
      title.textContent = content.alt || 'No Title';
      card.appendChild(title);
  } else if (type === 'video') {
      // Create video card
      const video = document.createElement('video');
      video.src = content.video_files[0].link; // Use the first video file
      video.controls = true;
      video.style.width = '100%';
      card.appendChild(video);

      const title = document.createElement('h3');
      title.textContent = content.url || 'No Title';
      card.appendChild(title);
  }

  return card;
}
document.addEventListener('DOMContentLoaded', async () => {
  // Fetch photos and display them
  const query = 'healthy recipes'; // Query for Pexels API
  const photos = await contentManager.fetchContent(query, 'photos', 9); // Fetch 9 photos

  // Display photos in the gallery
  const gallery = document.getElementById('content-gallery');
  photos.forEach(photo => {
      const card = contentManager.createCard(photo, 'photo');
      gallery.appendChild(card);
  });

  // Add click event to cards to show modal
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
      card.addEventListener('click', () => {
          const title = card.querySelector('h3').textContent;
          const imgSrc = card.querySelector('img').src;
          contentManager.showModal(`
              <div class="modal-content">
                  <img src="${imgSrc}" alt="${title}">
                  <h2>${title}</h2>
              </div>
          `);
      });
  });
});
showModal(content) {
  this.modal.innerHTML = `
      <div class="modal-content">
          ${content}
          <button id="close-modal">Close</button>
      </div>
  `;
  this.modal.style.display = 'flex';

  // Add close button functionality
  const closeButton = document.getElementById('close-modal');
  closeButton.addEventListener('click', () => {
      this.modal.style.display = 'none';
  });

  // Close modal when clicking outside the content
  this.modal.addEventListener('click', (event) => {
      if (event.target === this.modal) {
          this.modal.style.display = 'none';
      }
  });
}