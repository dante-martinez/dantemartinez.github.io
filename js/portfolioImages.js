import videoConfigurations from './videoConfig.js';


const imageCount = 44; // Number of images
const gallery = document.getElementById('gallery');

// Create the lightbox modal elements
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.className = 'lightbox';

const lightboxClose = document.createElement('span');
lightboxClose.className = 'lightbox-close';
lightboxClose.innerHTML = '&times;';

const lightboxImage = document.createElement('img');
lightboxImage.className = 'lightbox-content';
lightboxImage.id = 'lightbox-image';

lightbox.appendChild(lightboxClose);
lightbox.appendChild(lightboxImage);
document.body.appendChild(lightbox);

// Event listeners for closing the lightbox
lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

for (let i = 0; i < imageCount; i++) {
    const config = videoConfigurations.find(config => config.imageIndex === i);

    if (config) { // Special handling for images with videos
        const container = document.createElement('div');
        container.className = 'image-container';

        const img = document.createElement('img');
        img.src = `./images/portfolioImages/${i}.png`; // Image source
        img.alt = `Image ${i}`;
        container.appendChild(img);

        const iframe = document.createElement('iframe');
        iframe.src = config.videoURL;
        container.appendChild(iframe);

        // Apply CSS properties from the configuration
        Object.assign(iframe.style, config.cssProperties);

        gallery.appendChild(container);
    } else {
        const img = document.createElement('img');
        img.src = `./images/portfolioImages/${i}.png`; // Image source
        img.alt = `Image ${i}`;
        img.className = 'gallery-image'; // Add class for lightbox
        gallery.appendChild(img);

        // Add event listener to open the image in the lightbox
        img.addEventListener('click', () => {
            lightboxImage.src = img.src;
            lightbox.style.display = 'flex';
        });
    }
}
