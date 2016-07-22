export function installServiceWorker () {
	if (!('serviceWorker' in navigator)) {
		return
	}

	navigator.serviceWorker
		.register('/worker.js')
		.then(registration => {
			console.log('ServiceWorker registration successful with scope: ', registration.scope)
		})
		.catch(error => {
			console.error('ServiceWorker registration failed: ', error)
		})
}
