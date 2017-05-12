const version = "static-v2";
self.addEventListener("install", event => {
  console.log(`${version} installing…`);

  // 这里缓存一个 cat.svg
  event.waitUntil(
    caches.open(version).then(cache => cache.add("/demo2/cat.svg"))
  );
});

self.addEventListener("activate", event => {
  console.log(`${version} now ready to handle fetches!`);
  clients.claim();
  // 但设置了 clients.claim() 后, 第一次的请求可能会被处理, 
  // 之所以是`可能`;
  // 是因为 请求需要在 clients.claim(); 运行之后 再能被处理
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  console.info(`fetch ${url.pathname}`);
  //如果是同域并且请求的是 dog.svg 的话，那么返回 cat.svg
  if (url.origin == location.origin && url.pathname == "/demo2/dog.svg") {
    event.respondWith(caches.match("/demo2/cat.svg"));
  }
});
