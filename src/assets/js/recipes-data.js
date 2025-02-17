<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>บทความสุขภาพ - TeeSmartHealthy</title>
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="/src/assets/css/style.css">
</head>
<body>
    <div id="header-placeholder"></div>

    <main class="main-content">
        <section class="hero-section">
            <h1>บทความสุขภาพ</h1>
            <p>รวมบทความดีๆ เพื่อสุขภาพที่ดีของคุณ</p>
        </section>

        <section class="articles-filters">
            <div class="search-box">
                <input type="text" id="article-search" placeholder="ค้นหาบทความ...">
                <i class="fas fa-search"></i>
            </div>
            <div class="filter-buttons">
                <button class="filter-btn active" data-category="all">ทั้งหมด</button>
                <button class="filter-btn" data-category="exercise">ออกกำลังกาย</button>
                <button class="filter-btn" data-category="nutrition">โภชนาการ</button>
                <button class="filter-btn" data-category="mental-health">สุขภาพจิต</button>
            </div>
        </section>

        <div class="grid-container" id="articles-grid"></div>
    </main>

    <div id="footer-placeholder"></div>

    <script type="module">
        import { fetchImages } from '/src/assets/js/api.js';
        import { articles } from '/src/assets/js/articles-data.js';

        async function loadArticles(category = 'all') {
            const articlesGrid = document.getElementById('articles-grid');
            articlesGrid.innerHTML = '';
            
            const filteredArticles = category === 'all' 
                ? articles 
                : articles.filter(article => article.category === category);

            for (const article of filteredArticles) {
                const images = await fetchImages(article.image_query, 1);
                const articleElement = document.createElement('article');
                articleElement.className = 'grid-item article-card';
                articleElement.innerHTML = `
                    <img src="${images[0].src.large}" alt="${article.title}" loading="lazy">
                    <div class="grid-item-content">
                        <div class="article-meta">
                            <span class="category">${article.category}</span>
                            <span class="date">${article.date}</span>
                        </div>
                        <h3>${article.title}</h3>
                        <p>${article.description}</p>
                        <div class="article-tags">
                            ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="article-content hide">
                            ${article.content}
                        </div>
                        <button class="read-more-btn" onclick="toggleArticle(this)">
                            อ่านเพิ่มเติม
                        </button>
                    </div>
                `;
                articlesGrid.appendChild(articleElement);
            }
        }

        window.toggleArticle = function(button) {
            const content = button.previousElementSibling;
            content.classList.toggle('hide');
            button.textContent = content.classList.contains('hide') 
                ? 'อ่านเพิ่มเติม' 
                : 'แสดงน้อยลง';
        };

        document.addEventListener('DOMContentLoaded', () => {
            loadArticles();
            
            // Filter functionality
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.filter-btn')
                        .forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    loadArticles(e.target.dataset.category);
                });
            });

            // Search functionality
            document.getElementById('article-search').addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                document.querySelectorAll('.article-card').forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const desc = card.querySelector('p').textContent.toLowerCase();
                    const tags = Array.from(card.querySelectorAll('.tag'))
                        .map(tag => tag.textContent.toLowerCase());
                    
                    const isVisible = title.includes(searchTerm) || 
                        desc.includes(searchTerm) ||
                        tags.some(tag => tag.includes(searchTerm));
                    
                    card.style.display = isVisible ? 'block' : 'none';
                });
            });
        });
    </script>
</body>
</html>