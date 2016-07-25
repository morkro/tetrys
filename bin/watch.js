const watch = require('node-watch')
const debug = require('debug')('tetrys:watcher')
const build = require('./build.js')

watch(['./src/index.html', './src/views'], () => {
	debug('rebuild html')
	build.html()
})

watch(['./src/manifest.json', './src/humans.txt'], () => {
	debug('rebuild assets')
	build.assets()
})

watch('./src/scripts', () => {
	debug('rebuild scripts')
	build.scripts()
})

watch('./package.json', () => {
	debug('rebuild service worker')
	build.scripts({ main: false, worker: true })
})

watch('./src/styles', () => {
	debug('rebuild css')
	build.css()
})
