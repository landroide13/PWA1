if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js')
  .then(reg => {
    console.log('SW Register', reg);
  }).catch(err => {
    console.log('Error: ' + err);
  })
}