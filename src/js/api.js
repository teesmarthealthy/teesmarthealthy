// filepath: /teesmarthealthy/teesmarthealthy/src/js/api.js

const pexelsApiKey = 'Ducjg6pUZm37ckuhio7CoWJ3FkqsGaWRu8Vf79RYoYqYf4Tn903qxane'; // Your Pexels API key

// Function to fetch images from Pexels API based on a query
async function fetchImages(query, perPage = 9) {
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

// Function to fetch articles from a hypothetical API
async function fetchArticles() {
    // Placeholder for fetching articles logic
    // This function should return an array of articles
    return [
        {
            title: "Healthy Eating",
            content: "Eating healthy is crucial for maintaining a balanced lifestyle.",
            image: await fetchImages('healthy food', 1)
        },
        {
            title: "Exercise Benefits",
            content: "Regular exercise can improve your overall health and fitness.",
            image: await fetchImages('exercise', 1)
        }
    ];
}

// Function to fetch recipes from a hypothetical API
async function fetchRecipes() {
    // Placeholder for fetching recipes logic
    return [
        {
            title: "Quinoa Salad",
            content: "A nutritious salad packed with protein and fiber.",
            image: await fetchImages('quinoa', 1)
        },
        {
            title: "Grilled Chicken",
            content: "A simple and healthy grilled chicken recipe.",
            image: await fetchImages('grilled chicken', 1)
        }
    ];
}

// Function to fetch videos from a hypothetical API
async function fetchVideos() {
    // Placeholder for fetching videos logic
    return [
        {
            title: "Yoga for Beginners",
            url: "https://www.youtube.com/watch?v=example1"
        },
        {
            title: "Healthy Cooking Tips",
            url: "https://www.youtube.com/watch?v=example2"
        }
    ];
}