const version = "static-v1";

self.addEventListener("install", event => {
  console.log(`${version} installing…`);
  // 这里缓存一个 cat.svg
  event.waitUntil(
    caches.open(version).then(cache => cache.add("/demo1/cat.svg"))
  );
});

self.addEventListener("activate", event => {
  // 第一次的请求不会被 SW 处理
  console.log(`${version} now ready to handle fetches!`);
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  console.info(`fetch ${url.pathname}`);
  //如果是同域并且请求的是 dog.svg 的话，那么返回 cat.svg
  if (url.origin == location.origin && url.pathname == "/demo1/dog.svg") {
    event.respondWith(caches.match("/demo1/cat.svg"));
  }
});
