document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.lightbox-close');
    
    document.querySelectorAll('.gallery-image').forEach(image => {
        image.addEventListener('click', function () {
            lightbox.style.display = 'flex';
            lightboxImage.src = this.src; // Set the lightbox image source to the clicked image
        });
    });

    // Close lightbox when close button is clicked
    closeBtn.addEventListener('click', function () {
        lightbox.style.display = 'none';
    });

    // Close lightbox when clicking outside of the image
    lightbox.addEventListener('click', function (e) {
        if (e.target !== lightboxImage) {
            lightbox.style.display = 'none';
        }
    });

    // Close lightbox on ESC key press
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
        }
    });
});
