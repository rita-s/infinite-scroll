const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const count = 30;
let page = Math.floor(Math.random() * 30) + 1;
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function displayPhotos(photos) {
    imagesLoaded = 0;
    totalImages = photos.length;
    photos.forEach((photo) => {
        const item = document.createElement('a');
        item.setAttribute('href', photo.url);
        item.setAttribute('target', '_blank');
        item.setAttribute('rel', 'noopener');

        const img = document.createElement('img');
        img.setAttribute('src', `https://picsum.photos/id/${photo.id}/1080/720`);
        img.setAttribute('alt', `Photo by ${photo.author}`);
        img.setAttribute('title', `Photo by ${photo.author}`);
        img.setAttribute('loading', 'lazy');
        img.addEventListener('load', imageLoaded);
        img.addEventListener('error', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    ready = false;
    loader.hidden = false;
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${count}`);
        const photos = await response.json();
        page++;
        displayPhotos(photos);
    } catch (error) {
        loader.hidden = true;
        ready = true;
    }
}

window.addEventListener('scroll', () => {
    if (ready && window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        getPhotos();
    }
});

getPhotos();
