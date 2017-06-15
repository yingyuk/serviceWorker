  navigator.serviceWorker.register("/sw.js", {
      scope: '/',
    })
    .then(reg => console.log("SW registered!", reg))
    .catch(err => console.log("Boo!", err));
