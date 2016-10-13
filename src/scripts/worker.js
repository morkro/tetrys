const log = console.log.bind(console)
const { PACKAGE_VERSION } = process.env
const cacheKey = `TETRYS_CACHE-${PACKAGE_VERSION}`
const staticCacheItems = [
	'/',
	'/humans.txt',
	'/index.html',
	'/manifest.json',
	'/main.js',
	'/worker.js',
	'/main.css',
	'/images/launcher-48.png',
	'/images/launcher-96.png',
	'/images/launcher-144.png',
	'/images/launcher-196.png',
	'/images/launcher-384.png'
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
	log('%cserviceworker:activate', 'color:blue')
})

/**
 * Returns the cached response.
 */
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then(res => res || fetch(event.request))
	)
})
