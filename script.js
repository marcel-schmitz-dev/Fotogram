const images = [
    "assets/img/colmar-fachwerkhaus-gasse.png",
    "assets/img/colmar-gelbes-haus-hof.png",
    "assets/img/colmar-kanal-stadtansicht.png",
    "assets/img/colmar-altstadt-fassaden.png",
    "assets/img/dolomiten-see-spiegelung.png",
    "assets/img/dolomiten-berglandschaft-kristallsee.png",
    "assets/img/dolomiten-winter-gebirge.png",
    "assets/img/dolomiten-sonnenuntergang-see.png",
    "assets/img/karibik-strand-palmen.png",
    "assets/img/karibik-palmenwedel-nahaufnahme.png",
    "assets/img/karibik-tuerkisblaues-wasser.png",
    "assets/img/karibik-sonnenuntergang-strand.png"
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
    
    const fileName = images[currentIndex].split('/').pop().split('.')[0];
    const altText = fileName.replace('_', ' ');
    largeImage.alt = `Fotografisches Werk: ${altText}`;
    
    counter.innerText = `${currentIndex + 1} / ${images.length}`;
    imageTitle.innerText = altText;
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

    
    if (e.key === 'Tab') {
        
        const focusableElements = overlay.querySelectorAll('button');
        const firstElement = focusableElements[0]; 
        const lastElement = focusableElements[focusableElements.length - 1]; 

        if (e.shiftKey) { 
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else { 
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
});