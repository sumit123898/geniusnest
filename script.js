// Register the Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered: ', registration);
      })
      .catch((error) => {
        console.log('Service Worker registration failed: ', error);
      });
  });
}

// Web App Manifest
const manifest = {
  "short_name": "GeniusNest",
  "name": "GeniusNest - Creativity and Innovation",
  "icons": [
    {
      "src": "https://i.ibb.co/QjQBrfZ0/Genius-Nest.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "https://i.ibb.co/QjQBrfZ0/Genius-Nest.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": "/",
  "background_color": "#ffffff",
  "display": "standalone",
  "scope": "/",
  "theme_color": "#007bff"
};

// Service Worker for Caching
const CACHE_NAME = 'geniusnest-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  'https://i.ibb.co/QjQBrfZ0/Genius-Nest.png',
  'https://i.ibb.co/MyrzW3Ns/360-F-305459609-qq-NT6-Sk6-DZGhc-Eexc-Abs9xfq2i-I3yl2e.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
];

// Install the service worker and cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch cached assets or fetch from the network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

let currentSlide = 0;

function showSlide(index) {
  const carouselInner = document.querySelector('.carousel-inner');
  const slides = document.querySelectorAll('.carousel-item');
  const totalSlides = slides.length;

  if (index >= totalSlides) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = index;
  }

  const offset = -currentSlide * 100;
  carouselInner.style.transform = `translateX(${offset}%)`;
}

// Auto-play the carousel every 4 seconds
setInterval(() => {
  showSlide(currentSlide + 1);
}, 4000);