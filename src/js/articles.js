// filepath: /teesmarthealthy/teesmarthealthy/src/js/articles.js
const pexelsApiKey = 'Ducjg6pUZm37ckuhio7CoWJ3FkqsGaWRu8Vf79RYoYqYf4Tn903qxane'; // Your API key
const articlesContainer = document.getElementById('articles-container');

// Function to fetch articles and related images
async function getArticles() {
    // Sample articles data
    const articles = [
        {
            title: "The Benefits of a Healthy Diet",
            description: "Eating a balanced diet is crucial for maintaining good health. It helps in weight management and reduces the risk of chronic diseases.",
            imageQuery: "healthy food",
            videoUrl: "https://www.youtube.com/watch?v=example1"
        },
        {
            title: "Exercise: A Key to Wellness",
            description: "Regular physical activity is essential for a healthy lifestyle. It improves mental health and boosts overall well-being.",
            imageQuery: "exercise",
            videoUrl: "https://www.youtube.com/watch?v=example2"
        },
        {
            title: "Mental Health Awareness",
            description: "Understanding mental health is vital. It affects how we think, feel, and act. Awareness can lead to better support for those in need.",
            imageQuery: "mental health",
            videoUrl: "https://www.youtube.com/watch?v=example3"
        }
    ];

    for (const article of articles) {
        const images = await getPexelsImages(article.imageQuery);
        displayArticle(article, images[0], article.videoUrl);
    }
}

// Function to display an article
function displayArticle(article, image, videoUrl) {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('article');

    const title = document.createElement('h3');
    title.textContent = article.title;

    const description = document.createElement('p');
    description.textContent = article.description;

    const img = document.createElement('img');
    img.src = image.src.medium;
    img.alt = article.title;

    const videoLink = document.createElement('a');
    videoLink.href = videoUrl;
    videoLink.textContent = "Watch Video";
    videoLink.target = "_blank";

    articleDiv.appendChild(title);
    articleDiv.appendChild(description);
    articleDiv.appendChild(img);
    articleDiv.appendChild(videoLink);
    articlesContainer.appendChild(articleDiv);
}

// Fetch and display articles when the page loads
window.addEventListener('DOMContentLoaded', getArticles);