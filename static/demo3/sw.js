// ## step 1
// const version = "static-v3";
// self.addEventListener("install", event => {
//   console.log(`${version} installing…`);

//   // 这里缓存一个 cat.svg
//   event.waitUntil(
//     caches.open(version).then(cache => cache.add("/demo3/cat.svg"))
//   );
// });

// self.addEventListener("activate", event => {
//   console.log(`${version} now ready to handle fetches!`);
//   clients.claim();
//   // 但设置了 clients.claim() 后, 第一次的请求可能会被处理, 
//   // 之所以是`可能`;
//   // 是因为 请求需要在 clients.claim(); 运行之后 再能被处理
// });

// self.addEventListener("fetch", event => {
//   const url = new URL(event.request.url);
//   console.info(`fetch ${url.pathname}`);
//   //如果是同域并且请求的是 dog.svg 的话，那么返回 cat.svg
//   if (url.origin == location.origin && url.pathname == "/demo3/dog.svg") {
//     event.respondWith(caches.match("/demo3/cat.svg"));
//   }
// });

// ## step 2
// 更新 sw.js

const expectedCaches = ["static-v3.1"];

self.addEventListener("install", event => {
  console.log(`${expectedCaches[0]} installing…`);

  // 这里缓存一个 cat.svg
  event.waitUntil(
    caches.open(expectedCaches[0]).then(cache => cache.addAll([
      './index.html',
      '/demo3/cat.svg',
      '/demo3/horse.svg',
      ]))
  );
});

self.addEventListener("activate", event => {
  console.log(`${expectedCaches[0]} now ready to handle fetches!`);
  clients.claim();
  // 但设置了 clients.claim() 后, 第一次的请求可能会被处理, 
  // 之所以是`可能`;
  // 是因为 请求需要在 clients.claim(); 运行之后 再能被处理
  // 删除额外的缓存，static-v1 将被删掉
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log("V2 now ready to handle fetches!");
    })
  );
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  console.info(`fetch ${url.pathname}`);
  //如果是同域并且请求的是 dog.svg 的话，那么返回 horse.svg
  if (url.origin == location.origin && url.pathname == "/demo3/dog.svg") {
    event.respondWith(caches.match("/demo3/cat.svg" ));
  }
});
