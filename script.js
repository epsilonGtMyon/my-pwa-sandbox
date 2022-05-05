(function () {
  const title = "my-pwa-sandbox"
  const isLocal = location.hostname === 'localhost'
  const prefix = isLocal ? '/' : '/my-pwa-sandbox/'

  const incrementElem = document.querySelector("#increment");
  const countElem = document.querySelector("#count");
  const notification1ButtonElem = document.querySelector("#notification1Button");
  const notification2ButtonElem = document.querySelector("#notification2Button");

  const toResourceUrl = (path) => `${prefix}${path}`

  async function isEnabledNotification() {
    if (Notification.permission === "granted") {
      return true;
    }
    const result = await Notification.requestPermission();
    return result === "granted";
  }

  incrementElem.addEventListener("click", () => {
    let count = Number(countElem.textContent || 0);
    count++;
    countElem.textContent = count;
  });

  notification1ButtonElem.addEventListener("click", async () => {
    if (!(await isEnabledNotification())) {
      return;
    }
    const serviceWorkerRegistration = await navigator.serviceWorker.ready
    serviceWorkerRegistration.showNotification(title, {
      body: "通知のテストです",
      image: toResourceUrl(`notification.png`),//やたら大きいイラスト通知エリアにでてくる
      icon: toResourceUrl(`notification.png`),
    });
  });

  notification2ButtonElem.addEventListener("click", async () => {
    if (!(await isEnabledNotification())) {
      return;
    }

    const serviceWorkerRegistration = await navigator.serviceWorker.ready
    let counter = 0;
    const timerId = setInterval(() => {
      counter++;
      if (counter > 5) {
        clearInterval(timerId);
        return;
      }

      serviceWorkerRegistration.showNotification(title, {
        body: `通知のテストです[${counter}]`,
        icon: toResourceUrl(`notification.png`),
        tag: "button2", //タグをつけると グルーピングできるっぽい,
        renotify: true, //タグ付けた場合はONにしておいたほうがいいかも、じゃないと古いのが画面に残る
      });
    }, 1500);

  });

  //-----------------

  if ("serviceWorker" in navigator) {
    const isLocal = location.hostname === "localhost";
    console.log("isLocal", isLocal);
    if (isLocal) {
      navigator.serviceWorker.register("./sw.js");
    } else {
      navigator.serviceWorker.register("./sw.js", {
        scope: "/my-pwa-sandbox/",
      });
    }
  }
})();
