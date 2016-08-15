const cleanDist = require('./build-clean')
const createHTML = require('./build-html')
const createCSS = require('./build-css')
const moveAssets = require('./build-assets')
const createJS = require('./build-js')
const watch = require('./watch')
const server = require('../server')
const debug = require('debug')('tetrys:build')

const { NODE_ENV } = process.env

if (NODE_ENV === 'development') {
	debug('start development build')
}
else {
	debug('start production build')
}

cleanDist()
	.then(() => moveAssets())
	.then(() => createHTML())
	.then(() => createCSS())
	.then(() => Promise.all([createJS.main(), createJS.worker()]))
	.then(() => server())
	.then(() => {
		if (NODE_ENV === 'production') {
			return
		}
		return watch()
	})
