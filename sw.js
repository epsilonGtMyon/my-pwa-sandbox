const cacheName = 'V1'
const isLocal = location.hostname === 'localhost'
const prefix = isLocal ? '/' : '/my-pwa-sandbox/'


self.addEventListener("install", event => {
  console.log("===========Service worker installed===========", event);

  const addResourcesToCache = async (resources) => {
    console.log("resources", resources)
    const cache = await caches.open(cacheName);
    await cache.addAll(resources);
  };

  const resources = [
    ``,
    `index.html`,
    `script.js`,
    `icon.png`,
    `notification.png`,
    `manifest.json`,
  ].map(x => `${prefix}${x}`)
  
  event.waitUntil(
    addResourcesToCache(resources)
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