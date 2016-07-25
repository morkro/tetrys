const { PACKAGE_VERSION } = process.env
const cacheKey = `TETRYS_CACHE-${PACKAGE_VERSION}`
const staticCacheItems = [
	'/',
	'/index.html',
	'/manifest.json',
	'/main.js',
	'/worker.js',
	'/main.css'
]

/**
 * Adds static items to cache on installation.
 */
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(cacheKey)
		.then(cache => cache.addAll(staticCacheItems))
		.then(() => self.skipWaiting())
	)
})

self.addEventListener('activate', (event) => {
	const cacheWhiteList = [cacheKey]
	event.waitUntil(
		caches.keys().then(keyList => Promise.all(keyList.map(key => {
			if (cacheWhiteList.indexOf(key) === -1) {
				return caches.delete(key)
			}
			return key
		})))
	)
	console.log('Activated', event)
})

/**
 * Returns the cached response.
 */
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then(res => res || fetch(event.request))
	)
})
