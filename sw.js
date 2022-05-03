const cacheName = 'V1'
const isLocal = location.hostname === 'localhost'
//const prefix = isLocal ? '/' : '/my-pwa-sandbox/'
const prefix = '/'

self.addEventListener("install", event => {
  console.log("===========Service worker installed===========", event);

  const addResourcesToCache = async (resources) => {
    console.log("resources", resources)
    const cache = await caches.open(cacheName);
    await cache.addAll(resources);
  };
  
  event.waitUntil(
    addResourcesToCache([
      `${prefix}`,
      `${prefix}index.html`,
      `${prefix}script.js`,
      `${prefix}icon.png`,
      `${prefix}manifest.json`,
    ])
  );
});
self.addEventListener("activate", event => {
  console.log("Service worker activated", event);
});
self.addEventListener("fetch", event => {
  console.log("------fetch------", event?.request?.url);

  event.respondWith(
    caches.match(event.request).then(r => {
      console.log(event.request.url, r)
      return r || fetch(event.request)
    })
  )
})