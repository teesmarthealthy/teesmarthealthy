const videoCategories = {
    exercise: 'workout fitness exercise',
    nutrition: 'healthy food cooking',
    meditation: 'meditation yoga wellness',
    all: 'health wellness fitness'
};

async function getPexelsVideos(category) {
    const query = videoCategories[category] || videoCategories.all;
    try {
        const response = await fetch(`https://api.pexels.com/videos/search?query=${query}&per_page=12&orientation=landscape`, {
            headers: { 'Authorization': pexelsApiKey }
        });
        const data = await response.json();
        return data.videos;
    } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
    }
}

function displayVideos(videos) {
    videoGallery.innerHTML = '';
    videos.forEach(video => {
        const videoCard = createVideoCard(video);
        videoGallery.appendChild(videoCard);
    });
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-container';
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.image}" alt="${video.title || 'Health Video'}" loading="lazy">
            <div class="play-button">▶️</div>
        </div>
        <div class="video-info">
            <h3>${video.title || 'วิดีโอสุขภาพ'}</h3>
            <p class="video-duration">${formatDuration(video.duration)}</p>
        </div>
    `;
    
    card.addEventListener('click', () => openVideoModal(video));
    return card;
}

function openVideoModal(video) {
    const modalVideoContainer = document.getElementById('modal-video-container');
    modalVideoContainer.innerHTML = `
        <video id="player" playsinline controls>
            <source src="${video.video_files[0].link}" type="video/mp4">
        </video>
    `;
    
    document.getElementById('modal-title').textContent = video.title || 'วิดีโอสุขภาพ';
    document.getElementById('modal-description').textContent = 
        video.description || 'วิดีโอเพื่อการมีสุขภาพที่ดี';
    
    const player = new Plyr('#player', {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen']
    });
    
    modal.style.display = 'flex';
}

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Add modal close functionality
document.querySelector('.close-modal').addEventListener('click', () => {
    modal.style.display = 'none';
    const modalVideoContainer = document.getElementById('modal-video-container');
    modalVideoContainer.innerHTML = '';
});