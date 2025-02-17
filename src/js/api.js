// Make sure your API key is valid and working
const PEXELS_API_KEY = 'Ducjg6pUZm37ckuhio7CoWJ3FkqsGaWRu8Vf79RYoYqYf4Tn903qxane';

// Add error handling and validation
async function getPexelsVideos(query, per_page = 4) {
    try {
        const response = await fetch(`https://api.pexels.com/videos/search?query=${query}&per_page=${per_page}`, {
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.videos || data.videos.length === 0) {
            console.warn(`No videos found for query: ${query}`);
            return [];
        }
        
        return data.videos;
    } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
    }
}