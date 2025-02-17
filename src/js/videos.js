// filepath: vscode-vfs://github/teesmarthealthy/teesmarthealthy/src/js/videos.js
const pexelsApiKey = 'Ducjg6pUZm37ckuhio7CoWJ3FkqsGaWRu8Vf79RYoYqYf4Tn903qxane'; // Your API key
const videoGallery = document.getElementById('video-gallery');

// Function to fetch videos from Pexels API
async function getPexelsVideos(query, perPage = 5) {
  try {
    const response = await fetch(`https://api.pexels.com/videos/search?query=${query}&per_page=${perPage}`, {
      headers: {
        'Authorization': pexelsApiKey
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.videos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

// Function to display videos in the gallery
function displayVideos(videos) {
  videoGallery.innerHTML = ''; // Clear the gallery before adding new videos

  videos.forEach(video => {
    const videoContainer = document.createElement('div'); // Create container for video
    videoContainer.classList.add('video-container'); // Add class for styling

    const videoElement = document.createElement('video');
    videoElement.src = video.video_files[0].link; // Use the first video file link
    videoElement.controls = true; // Add controls for the video
    videoElement.loading = 'lazy'; // Add lazy loading for performance

    const title = document.createElement('h3');
    title.textContent = video.alt; // Set video title

    videoContainer.appendChild(title);
    videoContainer.appendChild(videoElement);
    videoGallery.appendChild(videoContainer);
  });
}

// Call function to fetch and display videos when the page loads
window.addEventListener('DOMContentLoaded', async () => {
  const healthVideos = await getPexelsVideos('health'); // Change query as needed
  displayVideos(healthVideos);
});