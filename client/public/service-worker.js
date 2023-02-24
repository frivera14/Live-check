/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */

const CACHE_NAME = "live-check-cache";

// Define the files to cache
const urlsToCache = [
  "/icons/android-launchericon-48-48.png",
  "/icons/android-launchericon-72-72.png",
  "/icons/android-launchericon-96-96.png",
  "/icons/android-launchericon-144-144.png",
  "/icons/android-launchericon-192-192.png",
  "/icons/android-launchericon-512-512.png",
  "/index.html",
  "/manifest.json",
  "/favicon.ico"
];

// Install the service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache opened");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch the cached files when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log(`Fetched ${event.request.url} from cache`);
        return response;
      } else {
        console.log(`Fetched ${event.request.url} from network`);
        return fetch(event.request);
      }
    })
  );
});

// Delete old caches when a new one is activated
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`Deleting cache ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
