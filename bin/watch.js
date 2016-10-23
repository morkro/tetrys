const createHTML = require('./build-html')
const createCSS = require('./build-css')
const moveAssets = require('./build-assets')
const createJS = require('./build-js')
const watch = require('node-watch')
const debug = require('debug')('tetrys:watcher')

function log (file, txt) {
	debug(`${file} changed`)
	debug(txt)
}

module.exports = () => {
	debug('start watching files')

	watch('./src/markup', (file) => {
		log(file, 'rebuild html')
		createHTML()
	})

	watch('./src/meta', (file) => {
		log(file, 'rebuild assets')
		moveAssets()
	})

	watch('./src/scripts', (file) => {
		log(file, 'rebuild scripts')
		Promise.all([createJS.main(), createJS.worker()])
	})

	watch('./package.json', (file) => {
		log(file, 'rebuild service worker')
		createJS.worker()
	})

	watch('./src/styles', (file) => {
		log(file, 'rebuild css')
		createCSS()
	})
}
