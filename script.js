const images = [
    "assets/img/img1.png", "assets/img/img2.png", "assets/img/img3.png",
    "assets/img/img4.png", "assets/img/img5.png", "assets/img/img6.png",
    "assets/img/img7.png", "assets/img/img8.png", "assets/img/img9.png",
    "assets/img/img10.png", "assets/img/img11.png", "assets/img/img12.png"
];

let currentIndex = 0;
const gallery = document.getElementById('gallery');
const overlay = document.getElementById('overlay');
const largeImage = document.getElementById('largeImage');
const counter = document.getElementById('imageCounter');
const imageTitle = document.getElementById('imageTitle');


function initGallery() {
    gallery.innerHTML = images.map((src, index) => {

        const fileName = src.split('/').pop().split('.')[0];
        const altText = fileName.replace('_', ' ');

        return `<img src="${src}" class="thumbnail" alt="Fotografisches Werk: ${altText}" onclick="openOverlay(${index})">`;
    }).join('');
}


initGallery();

function updateLargeImage() {
    largeImage.src = images[currentIndex];
    counter.innerText = `${currentIndex + 1} / ${images.length}`;
    
    
    const fileName = images[currentIndex].split('/').pop().split('.')[0];
    imageTitle.innerText = fileName.replace('_', ' ');
}

function openOverlay(index) {
    currentIndex = index;
    updateLargeImage(); 
    overlay.classList.remove('hidden');

    document.getElementById('nextBtn').focus();
}

function closeOverlay() {
    overlay.classList.add('hidden');
}

function nextImage(event) {
    if (event) event.stopPropagation(); 
    currentIndex = (currentIndex + 1) % images.length;
    updateLargeImage();
}

function prevImage(event) {
    if (event) event.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLargeImage();
}


document.addEventListener('keydown', (e) => {
    if (overlay.classList.contains('hidden')) return; 
    if (e.key === 'Escape') closeOverlay();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});


let touchStartX = 0;
let touchEndX = 0;

largeImage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

largeImage.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
});

function handleGesture() {
    if (touchEndX < touchStartX - 50) nextImage();
    if (touchEndX > touchStartX + 50) prevImage();
}