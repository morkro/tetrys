console.log('Started', self)

self.addEventListener('install', (event) => {
	self.skipWaiting()
	console.log('Install', event)
})

self.addEventListener('activate', (event) => {
	console.log('Activated', event)
})
