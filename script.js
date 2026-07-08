const images = [
    "assets/img/colmar-fachwerkhaus.png",
    "assets/img/colmar-gelbes-haus.png",
    "assets/img/colmar-kanal.png",
    "assets/img/colmar-altstadt.png",
    "assets/img/dolomiten-see-spiegelung.png",
    "assets/img/dolomiten-berglandschaft.png",
    "assets/img/dolomiten-winter-gebirge.png",
    "assets/img/dolomiten-sonnenuntergang.png",
    "assets/img/karibik-strand-palmen.png",
    "assets/img/karibik-palmenwedel.png",
    "assets/img/karibik-blaues-wasser.png",
    "assets/img/karibik-sonnenuntergang.png"
];

let currentIndex = 0;
const gallery = document.getElementById('gallery');
const overlay = document.getElementById('overlay');
const largeImage = document.getElementById('largeImage');
const counter = document.getElementById('imageCounter');
const imageTitle = document.getElementById('imageTitle');

function getAltText(src) {
    const fileName = src.split('/').pop().split('.')[0];
    return fileName.replace(/-/g, ' '); 
}

function initGallery() {
    gallery.innerHTML = images.map((src, index) => {
        const altText = getAltText(src);
        return `<img src="${src}" class="thumbnail" alt="Fotografisches Werk: ${altText}" onclick="openOverlay(${index})" tabindex="0">`;
    }).join('');
}

initGallery();

function updateLargeImage() {
    largeImage.src = images[currentIndex];
    const altText = getAltText(images[currentIndex]);
    largeImage.alt = `Fotografisches Werk: ${altText}`;
    counter.innerText = `${currentIndex + 1} / ${images.length}`;
    imageTitle.innerText = altText;
}

function openOverlay(index) {
    currentIndex = index;
    updateLargeImage();
    overlay.classList.remove('hidden');
    setTimeout(() => document.getElementById('prevBtn').focus(), 50);
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

function handleTabNavigation(e) {
    const focusable = overlay.querySelectorAll('button[tabindex="0"]');
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

document.addEventListener('keydown', (e) => {
    if (overlay.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeOverlay();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Tab') handleTabNavigation(e);
});