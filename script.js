document.addEventListener('DOMContentLoaded', function() {
    // เพิ่ม Intersection Observer สำหรับ animation เมื่อ scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, {
        threshold: 0.1
    });

    // เพิ่ม animation ให้กับ articles
    document.querySelectorAll('.article-card').forEach(article => {
        observer.observe(article);
    });

    // Smooth scrolling สำหรับ navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // โหลด Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
});