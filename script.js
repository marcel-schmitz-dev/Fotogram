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
const counter = document.getElementById('imageCounter'); // NEU: Referenz auf Counter

// 1. Bilder rendern
images.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'thumbnail';
    img.onclick = () => openOverlay(index);
    gallery.appendChild(img);
});

// NEU: Zentralisierte Funktion für Bild & Counter
function updateLargeImage() {
    largeImage.src = images[currentIndex];
    counter.innerText = `${currentIndex + 1} / ${images.length}`;
    
    // Den Namen aus dem Dateipfad extrahieren (z.B. "img1" aus "assets/img/img1.png")
    const fileName = images[currentIndex].split('/').pop().split('.')[0];
    document.getElementById('imageTitle').innerText = fileName;
}

function openOverlay(index) {
    currentIndex = index;
    updateLargeImage(); // Funktion aufrufen
    overlay.classList.remove('hidden');
}

function closeOverlay() {
    overlay.classList.add('hidden');
}

// 2. Navigation
function nextImage(event) {
    if (event) event.stopPropagation(); // Verhindert Schließen bei Klick auf Button
    currentIndex = (currentIndex + 1) % images.length;
    updateLargeImage();
}

function prevImage(event) {
    if (event) event.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLargeImage();
}

// 3. Tastatur-Events
document.addEventListener('keydown', (e) => {
    if (overlay.classList.contains('hidden')) return; // Nur wenn offen
    if (e.key === 'Escape') closeOverlay();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});