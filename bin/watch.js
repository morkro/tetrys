const watch = require('node-watch')
const debug = require('debug')('tetrys:watcher')
const build = require('./build.js')

watch(['./src/index.html', './src/views'], { recursive: true }, () => {
	debug('rebuild html')
	build.html()
})

watch('./src/manifest.json', { recursive: true }, () => {
	debug('rebuild manifest')
	build.manifest()
})

watch('./src/scripts', { recursive: true }, () => {
	debug('rebuild scripts')
	build.scripts()
})

watch('./src/styles', { recursive: true }, () => {
	debug('rebuild css')
	build.css()
})
