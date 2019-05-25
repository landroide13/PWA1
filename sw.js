const staticCacheName = 'site-static-v1';
const dynaChache = 'site-dyn-static';
const assets = [
  '/',
  '/index.html',
  '/js/ui.js',
  '/js/app.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  '/pages/fallback.html'
];

//Install Service Worker
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('Caching Assest..')
      cache.addAll(assets);
    })
  );
})

//Activate Service Worker
self.addEventListener('activate', e => {
  // console.log('Service Worker has been activated..')
  e.waitUntil(
    caches.keys().then(keys => {
      // console.log(keys);
      return Promise.all(
        keys.filter(key => key !== staticCacheName && key !== dynaChache)
        .map(key => caches.delete(key))
      )
    })
  )
})

//Add Event Listener
self.addEventListener('fetch', e => {
  // console.log('Fetch Event', e)
  e.respondWith(
    caches.match(e.request).then(cachesRes => {
      return cachesRes || fetch(e.request).then(fetchRes => {
        return caches.open(dynaChache).then(cache => {
          cache.put(e.request.url, fetchRes.clone())
          return fetchRes
        })
      })
    }).catch(() => caches.match('/pages/fallback.html'))
  )
})

