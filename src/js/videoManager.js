class VideoManager {
    constructor() {
        this.currentCategory = 'exercise';
        this.videos = {};
        this.init();
    }

    async init() {
        this.showLoading();
        await this.loadVideos();
        this.setupEventListeners();
        this.renderVideos();
    }

    showLoading() {
        const videoGrid = document.getElementById('videoGrid');
        videoGrid.innerHTML = '<div class="loading">กำลังโหลดวิดีโอ...</div>';
    }

    async loadVideos() {
        const categories = {
            exercise: 'fitness workout',
            nutrition: 'healthy cooking',
            meditation: 'meditation practice',
            yoga: 'yoga tutorial'
        };

        try {
            for (const [category, query] of Object.entries(categories)) {
                const videos = await getPexelsVideos(query, 8);
                if (videos && videos.length > 0) {
                    this.videos[category] = videos;
                } else {
                    console.error(`No videos found for category: ${category}`);
                }
            }
        } catch (error) {
            console.error('Error loading videos:', error);
            this.showError('ไม่สามารถโหลดวิดีโอได้ กรุณาลองใหม่อีกครั้ง');
        }
    }

    createVideoCard(video) {
        if (!video || !video.video_files || video.video_files.length === 0) {
            return null;
        }

        const card = document.createElement('div');
        card.className = 'video-card animate-fade-up';
        
        const videoUrl = video.video_files[0].link;
        const posterUrl = video.image;

        card.innerHTML = `
            <div class="video-wrapper">
                <video poster="${posterUrl}" controls preload="none">
                    <source src="${videoUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <div class="video-info">
                <h3>${video.user.name || 'Unknown'}</h3>
                <p>${Math.floor(video.duration)} นาที</p>
                <div class="video-tags">
                    ${(video.tags || []).map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
            </div>
        `;

        return card;
    }

    renderVideos() {
        const videoGrid = document.getElementById('videoGrid');
        videoGrid.innerHTML = '';

        const currentVideos = this.videos[this.currentCategory];
        if (!currentVideos || currentVideos.length === 0) {
            this.showError('ไม่พบวิดีโอในหมวดหมู่นี้');
            return;
        }

        currentVideos.forEach(video => {
            const card = this.createVideoCard(video);
            if (card) {
                videoGrid.appendChild(card);
            }
        });
    }

    showError(message) {
        const videoGrid = document.getElementById('videoGrid');
        videoGrid.innerHTML = `<div class="error-message">${message}</div>`;
    }
}