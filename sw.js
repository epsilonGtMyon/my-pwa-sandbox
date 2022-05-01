const isLocal = location.hostname === 'localhost'
const prefix = isLocal ? '' : '/my-pwa-sandbox/'

self.addEventListener("install", event => {
  console.log("Service worker installed", event);

  const addResourcesToCache = async (resources) => {
    console.log("resources", resources)
    const cache = await caches.open("v1");
    await cache.addAll(resources);
  };
  
  event.waitUntil(
    addResourcesToCache([
      `${prefix}`,
      `${prefix}index.html`,
      `${prefix}script.js`,
      `${prefix}icon.png`,
    ])
  );
});
self.addEventListener("activate", event => {
  console.log("Service worker activated", event);
});
self.addEventListener("fetch", event => {
  console.log("fetch", event);
})