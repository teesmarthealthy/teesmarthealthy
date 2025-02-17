# README.md

# Tee Smart Healthy

Tee Smart Healthy is a health-focused website that provides users with a variety of resources related to health, wellness, and nutrition. The site features articles, healthy recipes, videos, and a contact page for inquiries.

## Project Structure

```
teesmarthealthy
├── src
│   ├── pages
│   │   ├── home.html        # Homepage displaying featured images and links
│   │   ├── articles.html    # Page for health-related articles
│   │   ├── recipes.html     # Page showcasing healthy recipes
│   │   ├── videos.html      # Page displaying health and wellness videos
│   │   └── contact.html     # Contact information page
│   ├── js
│   │   ├── api.js           # Functions to interact with the Pexels API
│   │   ├── gallery.js       # Handles image display in gallery format
│   │   └── main.js          # Main entry point for JavaScript functionality
│   ├── css
│   │   ├── style.css        # Main styles for the website
│   │   └── layout.css       # Layout-specific styles for responsive design
│   └── components
│       ├── header.html      # Header structure included in all pages
│       └── footer.html      # Footer structure included in all pages
├── assets
│   └── content
│       ├── articles.json    # JSON array of articles with details
│       └── recipes.json     # JSON array of recipes with details
├── .env                     # Environment variables (e.g., Pexels API key)
├── package.json             # npm configuration file
└── README.md                # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd teesmarthealthy
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your Pexels API key:
   ```
   PEXELS_API_KEY=your_api_key_here
   ```

5. Open `index.html` in your browser to view the project.

## Features

- **Homepage**: Displays featured images and links to other sections.
- **Articles**: Contains health-related articles with images and videos.
- **Recipes**: Showcases healthy recipes with ingredients and instructions.
- **Videos**: Displays health and wellness videos.
- **Contact**: Provides contact information for inquiries.

## License

This project is licensed under the MIT License.