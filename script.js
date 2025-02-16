const pexelsApiKey = 'Ducjg6pUZm37ckuhio7CoWJ3FkqsGaWRu8Vf79RYoYqYf4Tn903qxane'; // API key ของคุณ
const imageGallery = document.getElementById('image-gallery');

// ฟังก์ชันสำหรับดึงข้อมูลภาพจาก Pexels API
async function getPexelsImages(query, perPage = 9) { // กำหนดจำนวนภาพที่ต้องการ perPage
  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}`, {
      headers: {
        'Authorization': pexelsApiKey
      }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // ตรวจสอบสถานะของ response
    }

    const data = await response.json();
    return data.photos;
  } catch (error) {
    console.error("Error fetching images:", error);
    return []; // ส่งคืน array ว่างเปล่าในกรณีที่เกิดข้อผิดพลาด
  }
}

// ฟังก์ชันสำหรับแสดงภาพในแกลเลอรี่
function displayImages(images) {
  imageGallery.innerHTML = ''; // ล้างแกลเลอรี่ก่อนเพิ่มภาพใหม่

  images.forEach(photo => {
    const imgContainer = document.createElement('div'); // สร้าง container สำหรับรูปภาพ
    imgContainer.classList.add('image-container'); // เพิ่ม class สำหรับจัดรูปแบบ

    const img = document.createElement('img');
    img.src = photo.src.medium;
    img.alt = photo.alt;
    img.loading = 'lazy'; // เพิ่ม lazy loading เพื่อปรับปรุงประสิทธิภาพ

    imgContainer.appendChild(img);
    imageGallery.appendChild(imgContainer);
  });
}



// เรียกฟังก์ชันเพื่อดึงและแสดงภาพเมื่อหน้าเว็บโหลด
window.addEventListener('DOMContentLoaded', async () => {
    const healthImages = await getPexelsImages('health'); // เปลี่ยน query เป็นคำที่ต้องการ
    displayImages(healthImages);


    // ตัวอย่างการดึงภาพเพิ่มเติม (เช่น อาหารเพื่อสุขภาพ)
    const foodImages = await getPexelsImages('healthy food');
    // ... (ส่วนการแสดงภาพ foodImages)
});