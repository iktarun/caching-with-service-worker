// Make sure sw are supported
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw_cached_pages.js")
      .then((reg) => console.log("Service Worker: Registered (Pages)"))
      .catch((err) => console.log(`Service Worker: Error: ${err}`));
  });
}

Notification.requestPermission(function (status) {
  console.log("Notification permission status:", status);
});

if (Notification.permission === "granted") {
  /* do our magic */
  // displayNotification();
} else if (Notification.permission === "blocked") {
  /* the user has previously denied push. Can't reprompt. */
} else {
  /* show a prompt to the user */
  Notification.requestPermission(function (status) {
    console.log("Notification permission status:", status);
  });
}

function displayNotification() {
  if (Notification.permission == "granted") {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      reg.showNotification("Hello world!");
    });
  }
}
