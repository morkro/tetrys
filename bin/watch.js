const createHTML = require('./build-html')
const createCSS = require('./build-css')
const moveAssets = require('./build-assets')
const createJS = require('./build-js')
const watch = require('node-watch')
const debug = require('debug')('tetrys:watcher')

module.exports = () => {
	debug('start watching files')

	watch('./src/markup', () => {
		debug('rebuild html')
		createHTML()
	})

	watch('./src/meta', () => {
		debug('rebuild assets')
		moveAssets()
	})

	watch('./src/scripts', () => {
		debug('rebuild scripts')
		Promise.all([createJS.main(), createJS.worker()])
	})

	watch('./package.json', () => {
		debug('rebuild service worker')
		createJS.worker()
	})

	watch('./src/styles', () => {
		debug('rebuild css')
		createCSS()
	})
}
