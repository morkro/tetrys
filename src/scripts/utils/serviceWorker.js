export default function installServiceWorker () {
	if (!('serviceWorker' in navigator)) {
		return
	}

	navigator.serviceWorker
		.register('/worker.js')
		.then(registration => {
			console.log(
				'%cserviceworker:registration', 'color:green',
				`successful with scope: ${registration.scope}`
			)
		})
		.catch(error => {
			console.error(
				'%cserviceworker:registration', 'color:red',
				'failed: ', error
			)
		})
}
