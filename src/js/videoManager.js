class VideoManager {
    constructor() {
        this.currentCategory = 'exercise';
        this.videos = {};
        this.init();
    }

    async init() {
        await this.loadVideos();
        this.setupEventListeners();
    }

    async loadVideos() {
        const categories = {
            exercise: 'fitness workout',
            nutrition: 'healthy cooking',
            meditation: 'meditation practice',
            yoga: 'yoga tutorial'
        };

        for (const [category, query] of Object.entries(categories)) {
            this.videos[category] = await getPexelsVideos(query, 8);
        }
    }

    setupEventListeners() {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.changeCategory(btn.dataset.category);
            });
        });
    }

    changeCategory(category) {
        this.currentCategory = category;
        this.updateActiveButton(category);
        this.renderVideos();
    }

    updateActiveButton(category) {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
    }

    renderVideos() {
        const videoGrid = document.getElementById('videoGrid');
        videoGrid.innerHTML = '';

        this.videos[this.currentCategory].forEach(video => {
            const card = this.createVideoCard(video);
            videoGrid.appendChild(card);
        });
    }

    createVideoCard(video) {
        const card = document.createElement('div');
        card.className = 'video-card animate-fade-up';
        
        card.innerHTML = `
            <video poster="${video.image}" controls>
                <source src="${video.video_files[0].link}" type="video/mp4">
            </video>
            <div class="video-info">
                <h3>${video.user.name}</h3>
                <p>${video.duration} นาที</p>
                <div class="video-tags">
                    ${video.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
            </div>
        `;

        return card;
    }
}

// Initialize video manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VideoManager();
});