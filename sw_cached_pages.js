const cacheName = "v1";

const cacheAssets = [
  "/index.html",
  "/about.html",
  "/css/style.css",
  "/js/main.js"
];

// Call Install Event
self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service Worker: Caching Files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
      .catch((err) =>
        console.log(`Service Worker: Caching Files: Error: ${err}`)
      )
  );
});

// Call Activate Event
self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  // Remove unwanted caches
  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== cacheName) {
              console.log("Service Worker: Clearing Old Cache");
              return caches.delete(cache);
            }
          })
        );
      })
      .catch((err) => console.log(`Service Worker: Activated: Error: ${err}`))
  );
});

// Call Fetch Event
self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

// Notifications related changes
self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});

self.addEventListener('push', function(e) {
  var options = {
    body: 'This notification was generated from a push!',
    icon: 'images/image256.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {action: 'explore', title: 'Explore this new world',
        icon: 'images/image256.png'},
      {action: 'close', title: 'Close',
        icon: 'images/image256.png'},
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Hello world!', options)
  );
});