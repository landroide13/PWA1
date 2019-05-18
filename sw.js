//Install Service Worker
self.addEventListener('install', e => {
  console.log('Service Worker has been installed..');
})

//Activate Service Worker
self.addEventListener('activate', e => {
  console.log('Service Worker has been activated..')
})

//Add Event Listener
self.addEventListener('fetch', e => {
  console.log('Fetch Event', e)
})

