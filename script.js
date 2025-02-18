const pexelsApiKey = 'Ducjg6pUZm37ckuhio7CoWJ3FkqsGaWRu8Vf79RYoYqYf4Tn903qxane';

async function getPexelsImages(query, perPage = 9) {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}`, {
            headers: { 'Authorization': pexelsApiKey }
        });
        const data = await response.json();
        return data.photos;
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
}

function createCard(content, type = 'photo') {
    const card = document.createElement('div');
    card.className = 'card';

    if (type === 'photo') {
        const img = document.createElement('img');
        img.src = content.src.medium;
        img.alt = content.alt || 'Image';
        card.appendChild(img);

        const title = document.createElement('h3');
        title.textContent = content.alt || 'No Title';
        card.appendChild(title);
    } else if (type === 'video') {
        const video = document.createElement('video');
        video.src = content.video_files[0].link;
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

    createCard(content, type = 'photo') {
        const card = document.createElement('div');
        card.className = 'card';

        if (type === 'photo') {
            const img = document.createElement('img');
            img.src = content.src.medium;
            img.alt = content.alt || 'Image';
            card.appendChild(img);

            const title = document.createElement('h3');
            title.textContent = content.alt || 'No Title';
            card.appendChild(title);
        } else if (type === 'video') {
            const video = document.createElement('video');
            video.src = content.video_files[0].link;
            video.controls = true;
            video.style.width = '100%';
            card.appendChild(video);

            const title = document.createElement('h3');
            title.textContent = content.url || 'No Title';
            card.appendChild(title);
        }

        return card;
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        document.body.appendChild(modal);
        return modal;
    }

    showModal(content) {
        this.modal.innerHTML = `
            <div class="modal-content">
                ${content}
                <button id="close-modal">Close</button>
            </div>
        `;
        this.modal.style.display = 'flex';

        const closeButton = document.getElementById('close-modal');
        closeButton.addEventListener('click', () => {
            this.modal.style.display = 'none';
        });

        this.modal.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.modal.style.display = 'none';
            }
        });
    }
}

const contentManager = new ContentManager();

document.addEventListener('DOMContentLoaded', async () => {
    const query = 'healthy recipes';
    const photos = await contentManager.fetchContent(query, 'photos', 9);

    const gallery = document.getElementById('content-gallery');
    photos.forEach(photo => {
        const card = contentManager.createCard(photo, 'photo');
        gallery.appendChild(card);
    });

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