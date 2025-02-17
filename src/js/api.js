const PEXELS_API_KEY = 'Ducjg6pUZm37ckuhio7CoWJ3FkqsGaWRu8Vf79RYoYqYf4Tn903qxane'; // Replace with your Pexels API key

class ContentAPI {
    constructor() {
        this.pexelsClient = {
            headers: {
                'Authorization': PEXELS_API_KEY
            }
        };
        this.baseUrl = 'https://api.pexels.com/v1';
    }

    // Fetch featured articles with related images
    async getFeaturedArticles() {
        try {
            const response = await fetch('assets/content/articles.json');
            const articles = await response.json();
            
            // Fetch related images for each article
            const articlesWithImages = await Promise.all(articles.map(async article => {
                const imageResponse = await this.searchPexelsImages(article.keywords[0], 1);
                return {
                    ...article,
                    image: imageResponse.photos[0].src.medium
                };
            }));

            return articlesWithImages;
        } catch (error) {
            console.error('Error fetching articles:', error);
            return [];
        }
    }

    // Fetch recipes with related images
    async getLatestRecipes() {
        try {
            const response = await fetch('assets/content/recipes.json');
            const recipes = await response.json();
            
            // Fetch related images for each recipe
            const recipesWithImages = await Promise.all(recipes.map(async recipe => {
                const imageResponse = await this.searchPexelsImages(recipe.keywords[0], 1);
                return {
                    ...recipe,
                    image: imageResponse.photos[0].src.medium
                };
            }));

            return recipesWithImages;
        } catch (error) {
            console.error('Error fetching recipes:', error);
            return [];
        }
    }

    // Search Pexels images
    async searchPexelsImages(query, perPage = 1) {
        try {
            const response = await fetch(
                `${this.baseUrl}/search?query=${query}&per_page=${perPage}`,
                this.pexelsClient
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching Pexels images:', error);
            return { photos: [] };
        }
    }

    // Newsletter subscription
    async subscribeNewsletter(email) {
        try {
            // Implement newsletter subscription logic here
            return { success: true, message: 'Successfully subscribed!' };
        } catch (error) {
            console.error('Error subscribing to newsletter:', error);
            return { success: false, message: 'Subscription failed. Please try again.' };
        }
    }

    // Contact form submission
    async submitContactForm(formData) {
        try {
            // Implement contact form submission logic here
            return { success: true, message: 'Message sent successfully!' };
        } catch (error) {
            console.error('Error submitting contact form:', error);
            return { success: false, message: 'Failed to send message. Please try again.' };
        }
    }
}

// Export instance
export const contentAPI = new ContentAPI();