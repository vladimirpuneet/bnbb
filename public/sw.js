/**
 * Service Worker for The Valley Gaze Penthouse
 *
 * Strategy:
 * - Precache the app shell (HTML, CSS, JS, icons) on install
 * - Cache-first for static assets (images, icons, fonts)
 * - Stale-while-revalidate for same-origin pages
 * - Network-first for API/external requests (weather)
 */

const CACHE_VERSION = "valley-gaze-v1";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const PAGE_CACHE = `${CACHE_VERSION}-pages`;

// Assets to precache on install
const PRECACHE_URLS = [
  "/",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
  "/images/img-01.jpeg",
  "/images/host.jpeg",
];

// Install — precache critical assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
      .catch(() => {
        // If precache fails, still install — we'll cache on demand
      }),
  );
});

// Activate — clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !key.startsWith(CACHE_VERSION))
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// Fetch — routing strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== "GET") return;

  // Skip cross-origin requests (weather API, maps, etc.) — let them go to network
  if (url.origin !== self.location.origin) return;

  // Skip Next.js HMR/dev requests
  if (url.pathname.startsWith("/_next/webpack-hmr")) return;

  // Image requests → cache-first
  if (request.destination === "image" || /\.(?:jpeg|jpg|png|gif|webp|svg|ico)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE, 30));
    return;
  }

  // Static assets (JS, CSS, fonts) → cache-first with long TTL
  if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "font" ||
    url.pathname.startsWith("/_next/static/")
  ) {
    event.respondWith(cacheFirst(request, STATIC_CACHE, 365));
    return;
  }

  // Navigation/document requests → stale-while-revalidate
  if (request.mode === "navigate" || request.destination === "document") {
    event.respondWith(staleWhileRevalidate(request, PAGE_CACHE));
    return;
  }

  // Default → try network, fall back to cache
  event.respondWith(
    fetch(request).catch(() => caches.match(request)),
  );
});

/** Cache-first strategy with optional max-age (in days). */
async function cacheFirst(request, cacheName, maxAgeDays) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    // Check max-age
    if (maxAgeDays) {
      const dateHeader = cached.headers.get("date");
      if (dateHeader) {
        const age = (Date.now() - new Date(dateHeader).getTime()) / (1000 * 60 * 60 * 24);
        if (age > maxAgeDays) {
          // Stale — revalidate in background
          fetch(request).then((res) => {
            if (res.ok) cache.put(request, res.clone());
          }).catch(() => {});
        }
      }
    }
    return cached;
  }

  // Not in cache — fetch and cache
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Offline and not cached — return a fallback
    return new Response("Offline", { status: 503, statusText: "Offline" });
  }
}

/** Stale-while-revalidate strategy. */
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  // Revalidate in background
  const networkFetch = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  // Return cached immediately if available, otherwise wait for network
  return cached || networkFetch;
}
