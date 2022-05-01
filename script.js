(function () {
  const incrementElem = document.querySelector("#increment");
  const countElem = document.querySelector("#count");

  incrementElem.addEventListener("click", () => {
    let count = Number(countElem.textContent || 0);
    count++;
    countElem.textContent = count;
  });

  if ("serviceWorker" in navigator) {
    const isLocal = location.hostname === 'localhost'
    if (isLocal) {
      navigator.serviceWorker.register("./sw.js");
    } else {
      navigator.serviceWorker.register("/my-pwa-sandbox/sw.js", {scope: '/my-pwa-sandbox/'});
    }
  }
})();
