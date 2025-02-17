const pexelsApiKey = 'Ducjg6pUZm37ckuhio7CoWJ3FkqsGaWRu8Vf79RYoYqYf4Tn903qxane'; // API key ของคุณ

// ฟังก์ชันสำหรับดึงข้อมูลภาพจาก Pexels API
async function getPexelsImages(query, perPage = 9) {
  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}`, {
      headers: {
        'Authorization': pexelsApiKey
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.photos;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

// ฟังก์ชันสำหรับแสดงภาพในแกลเลอรี่
function displayImages(images, container) {
  container.innerHTML = '';

  images.forEach(photo => {
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('image-container');

    const img = document.createElement('img');
    img.src = photo.src.medium;
    img.alt = photo.alt;
    img.loading = 'lazy';

    imgContainer.appendChild(img);
    container.appendChild(imgContainer);
  });
}

// เรียกฟังก์ชันเพื่อดึงและแสดงภาพเมื่อหน้าเว็บโหลด
window.addEventListener('DOMContentLoaded', async () => {
  const healthImages = await getPexelsImages('health');
  const imageGallery = document.getElementById('image-gallery');
  displayImages(healthImages, imageGallery);

  // สำหรับหน้า articles.html
  if (document.getElementById('articles-gallery')) {
    const articlesImages = await getPexelsImages('health articles');
    const articlesGallery = document.getElementById('articles-gallery');
    displayImages(articlesImages, articlesGallery);
  }

  // สำหรับหน้า recipes.html
  if (document.getElementById('recipes-gallery')) {
    const recipesImages = await getPexelsImages('healthy recipes');
    const recipesGallery = document.getElementById('recipes-gallery');
    displayImages(recipesImages, recipesGallery);
  }

  // สำหรับหน้า videos.html
  if (document.getElementById('videos-gallery')) {
    const videosImages = await getPexelsImages('health videos');
    const videosGallery = document.getElementById('videos-gallery');
    displayImages(videosImages, videosGallery);
  }
});