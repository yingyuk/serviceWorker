const version = "demo0-1";

self.addEventListener("install", event => {
  console.log(`${version} installing…`);
  // 这里缓存一个 cat.svg
  event.waitUntil(
    caches.open(version).then(cache => cache.add("/demo0/cat.svg"))
  );
});

self.addEventListener("activate", event => {
  // 第一次的请求不会被 SW 处理
  console.log(`${version} now ready to handle fetches!`);
});
