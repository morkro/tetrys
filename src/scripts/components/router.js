/**
 * @class Router
 */
export default class Router {
	constructor ({ defaultRoute = 'index' } = {}) {
		this.defaultRoute = defaultRoute
		this.previousRoute = null
		this.currentRoute = this.getCurrentRoute()
		this.onRouteChangeCallback = () => {}
	}

	getCurrentRoute () {
		const { hash } = window.location
		return hash ? hash.split('#')[1] : this.defaultRoute
	}

	getPreviousRoute () {
		return this.previousRoute ? this.previousRoute : this.defaultRoute
	}

	addEvents () {
		window.addEventListener('hashchange', ({ oldURL, newURL }) => {
			this.previousRoute = oldURL.split('#')[1]
			this.currentRoute = newURL.split('#')[1]
			this.onRouteChangeCallback(this.getPreviousRoute(), this.getCurrentRoute())
		})
	}

	init (cb = () => {}) {
		this.addEvents()
		cb(this.currentRoute)
	}

	onRouteChange (cb) {
		this.onRouteChangeCallback = cb
	}
}
