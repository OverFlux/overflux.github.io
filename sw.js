// ===== SERVICE WORKER FOR OVERFLUX PWA =====

const CACHE_NAME = 'overflux-v1.0.0';
const STATIC_CACHE_NAME = 'overflux-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'overflux-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/styles/styles.css',
  '/scripts/scripts.js',
  '/manifest.json',
  '/materials/overflux_logo_lowres.png',
  '/materials/favicon.ico',
  // Add Google Fonts
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap'
];

// Files to cache dynamically
const DYNAMIC_FILES = [
  '/images/selfie_founder.jpg',
  '/images/selfie_ceo.png',
  '/images/selfie_cto.jpg',
  '/images/selfie_tester.png',
  '/images/highres_bg_image.jpg'
];

// Maximum number of dynamic cache entries
const MAX_DYNAMIC_CACHE_SIZE = 50;

// ===== UTILITY FUNCTIONS =====

// Clean old caches
const cleanupCaches = async () => {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(name => 
    name !== STATIC_CACHE_NAME && 
    name !== DYNAMIC_CACHE_NAME &&
    name.startsWith('overflux-')
  );
  
  return Promise.all(
    oldCaches.map(cacheName => caches.delete(cacheName))
  );
};

// Limit cache size
const limitCacheSize = async (cacheName, maxSize) => {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxSize) {
    const keysToDelete = keys.slice(0, keys.length - maxSize);
    await Promise.all(
      keysToDelete.map(key => cache.delete(key))
    );
  }
};

// Check if request is for static content
const isStaticContent = (url) => {
  return STATIC_FILES.some(file => url.includes(file)) ||
         url.includes('.css') ||
         url.includes('.js') ||
         url.includes('.html') ||
         url.includes('fonts.googleapis.com') ||
         url.includes('fonts.gstatic.com');
};

// Check if request is for images
const isImageContent = (url) => {
  return url.includes('.jpg') ||
         url.includes('.jpeg') ||
         url.includes('.png') ||
         url.includes('.gif') ||
         url.includes('.webp') ||
         url.includes('.svg');
};

// ===== SERVICE WORKER EVENTS =====

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('OverFlux SW: Installing service worker...');
  
  event.waitUntil(
    (async () => {
      try {
        const staticCache = await caches.open(STATIC_CACHE_NAME);
        console.log('OverFlux SW: Caching static files...');
        await staticCache.addAll(STATIC_FILES);
        console.log('OverFlux SW: Static files cached successfully');
        
        // Skip waiting to activate immediately
        await self.skipWaiting();
      } catch (error) {
        console.error('OverFlux SW: Error during installation:', error);
      }
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('OverFlux SW: Activating service worker...');
  
  event.waitUntil(
    (async () => {
      try {
        await cleanupCaches();
        console.log('OverFlux SW: Old caches cleaned up');
        
        // Take control of all clients immediately
        await self.clients.claim();
        console.log('OverFlux SW: Service worker activated and took control');
      } catch (error) {
        console.error('OverFlux SW: Error during activation:', error);
      }
    })()
  );
});

// Fetch event - handle network requests
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  event.respondWith(
    (async () => {
      try {
        // Strategy 1: Cache First for static content
        if (isStaticContent(url.href)) {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // If not in cache, fetch and cache
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        }
        
        // Strategy 2: Network First with fallback for images
        if (isImageContent(url.href)) {
          try {
            const networkResponse = await fetch(request);
            if (networkResponse.ok) {
              const cache = await caches.open(DYNAMIC_CACHE_NAME);
              cache.put(request, networkResponse.clone());
              
              // Limit dynamic cache size
              limitCacheSize(DYNAMIC_CACHE_NAME, MAX_DYNAMIC_CACHE_SIZE);
            }
            return networkResponse;
          } catch (error) {
            // Network failed, try cache
            const cachedResponse = await caches.match(request);
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // Return placeholder image for failed image requests
            return new Response(
              '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"300\" viewBox=\"0 0 400 300\"><rect width=\"400\" height=\"300\" fill=\"#f3f4f6\"/><text x=\"200\" y=\"150\" text-anchor=\"middle\" fill=\"#9ca3af\" font-family=\"Arial\">Image unavailable</text></svg>',
              {
                headers: {
                  'Content-Type': 'image/svg+xml',
                  'Cache-Control': 'no-cache'
                }
              }
            );
          }
        }
        
        // Strategy 3: Network Only for API calls and other dynamic content
        return fetch(request);
        
      } catch (error) {
        console.error('OverFlux SW: Fetch error:', error);
        
        // For navigation requests, return cached index.html as fallback
        if (request.mode === 'navigate') {
          const cachedResponse = await caches.match('/index.html');
          if (cachedResponse) {
            return cachedResponse;
          }
        }
        
        // Return generic error response
        return new Response(
          JSON.stringify({
            error: 'Network error',
            message: 'Please check your internet connection'
          }),
          {
            status: 503,
            statusText: 'Service Unavailable',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      }
    })()
  );
});

// Background sync event (for future use)
self.addEventListener('sync', event => {
  console.log('OverFlux SW: Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Add background sync logic here
      Promise.resolve()
    );
  }
});

// Push event (for future notifications)
self.addEventListener('push', event => {
  console.log('OverFlux SW: Push event received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/materials/overflux_logo_lowres.png',
    badge: '/materials/overflux_logo_lowres.png',
    tag: 'overflux-notification',
    renotify: true,
    requireInteraction: true,
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/materials/overflux_logo_lowres.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('OverFlux', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', event => {
  console.log('OverFlux SW: Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message event for communication with main thread
self.addEventListener('message', event => {
  console.log('OverFlux SW: Message received:', event.data);
  
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'SKIP_WAITING':
        self.skipWaiting();
        break;
      case 'GET_VERSION':
        event.ports[0].postMessage({ version: CACHE_NAME });
        break;
      case 'CLEAR_CACHE':
        event.waitUntil(
          (async () => {
            const cacheNames = await caches.keys();
            await Promise.all(
              cacheNames.map(cacheName => caches.delete(cacheName))
            );
            event.ports[0].postMessage({ success: true });
          })()
        );
        break;
      default:
        console.log('OverFlux SW: Unknown message type:', event.data.type);
    }
  }
});

// Error event
self.addEventListener('error', event => {
  console.error('OverFlux SW: Service worker error:', event.error);
});

console.log('OverFlux SW: Service worker script loaded');
