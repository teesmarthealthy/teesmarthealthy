const PEXELS_API_KEY = 'Ducjg6pUZm37ckuhio7CoWJ3FkqsGaWRu8Vf79RYoYqYf4Tn903qxane';

export async function fetchImages(query, per_page = 9) {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=${per_page}`, {
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });
        const data = await response.json();
        return data.photos;
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
}

export async function fetchVideos(query, per_page = 6) {
    try {
        const response = await fetch(`https://api.pexels.com/videos/search?query=${query}&per_page=${per_page}`, {
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });
        const data = await response.json();
        return data.videos;
    } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
    }
}