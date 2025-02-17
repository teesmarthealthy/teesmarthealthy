// filepath: vscode-vfs://github/teesmarthealthy/teesmarthealthy/src/js/recipes.js
const pexelsApiKey = 'Ducjg6pUZm37ckuhio7CoWJ3FkqsGaWRu8Vf79RYoYqYf4Tn903qxane'; // Your API key
const recipesContainer = document.getElementById('recipes-container');

// Function to fetch recipes images from Pexels API
async function getPexelsImages(query, perPage = 5) {
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

// Function to display recipes and associated images
async function displayRecipes() {
  const recipes = [
    {
      title: "Healthy Salad",
      description: "A fresh and nutritious salad packed with vitamins.",
      imageQuery: "salad",
      videoUrl: "https://www.youtube.com/watch?v=example1"
    },
    {
      title: "Quinoa Bowl",
      description: "A protein-rich quinoa bowl with vegetables.",
      imageQuery: "quinoa",
      videoUrl: "https://www.youtube.com/watch?v=example2"
    },
    {
      title: "Smoothie Recipe",
      description: "A delicious smoothie to kickstart your day.",
      imageQuery: "smoothie",
      videoUrl: "https://www.youtube.com/watch?v=example3"
    }
  ];

  recipesContainer.innerHTML = ''; // Clear previous content

  for (const recipe of recipes) {
    const images = await getPexelsImages(recipe.imageQuery);
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');

    const title = document.createElement('h3');
    title.textContent = recipe.title;

    const description = document.createElement('p');
    description.textContent = recipe.description;

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('image-container');

    if (images.length > 0) {
      const img = document.createElement('img');
      img.src = images[0].src.medium;
      img.alt = recipe.title;
      imgContainer.appendChild(img);
    }

    const videoLink = document.createElement('a');
    videoLink.href = recipe.videoUrl;
    videoLink.textContent = "Watch Video";
    videoLink.target = "_blank";

    recipeDiv.appendChild(title);
    recipeDiv.appendChild(description);
    recipeDiv.appendChild(imgContainer);
    recipeDiv.appendChild(videoLink);
    recipesContainer.appendChild(recipeDiv);
  }
}

// Call the function to display recipes when the page loads
window.addEventListener('DOMContentLoaded', displayRecipes);