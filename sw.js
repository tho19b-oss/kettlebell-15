/* Kettlebell 15 — Service Worker (Cache-First für eigene Assets) */

const CACHE = "kb15-v5";

const ASSETS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./js/timer.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./videos/front-squat.mp4",
];

self.addEventListener("install", (ev) => {
  ev.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (ev) => {
  ev.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Range-Anfragen (Videos) aus dem Cache selbst zuschneiden — Safari/iOS
   akzeptiert für <video> nur echte 206-Antworten, keine vollen 200er */
async function serveRange(req) {
  const full = await caches.match(req.url);
  if (!full) return fetch(req);
  const buf = await full.arrayBuffer();
  const m = /bytes=(\d+)-(\d+)?/i.exec(req.headers.get("range") || "");
  if (!m) return full;
  const start = Number(m[1]);
  const end = m[2] ? Math.min(Number(m[2]), buf.byteLength - 1) : buf.byteLength - 1;
  if (start >= buf.byteLength) return new Response(null, { status: 416 });
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: {
      "Content-Type": full.headers.get("Content-Type") || "video/mp4",
      "Content-Range": "bytes " + start + "-" + end + "/" + buf.byteLength,
      "Content-Length": String(end - start + 1),
      "Accept-Ranges": "bytes",
    },
  });
}

self.addEventListener("fetch", (ev) => {
  const req = ev.request;
  if (req.method !== "GET") return;

  if (req.headers.has("range")) {
    ev.respondWith(serveRange(req));
    return;
  }

  // Navigation: Netz zuerst (frische index.html), Fallback Cache → offline-fähig
  if (req.mode === "navigate") {
    ev.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Assets: Cache zuerst, sonst Netz (und nachcachen)
  ev.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          // Nur volle 200er cachen — 206-Teilantworten würden den Cache vergiften
          if (res.status === 200 && new URL(req.url).origin === location.origin) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
    )
  );
});
