const fs = require('fs-extra')
const browserify = require('browserify')
const debug = require('debug')('tetrys:build')

module.exports = {
	html () {
		debug('build html files')
		fs.copy('./src/index.html', './dist/index.html',
			{ clobber: true },
			(error) => {
				if (error) return debug(error)
			}
		)
	},

	scripts () {
		debug('build javascript')
		browserify('./src/scripts/index.js')
			.transform('babelify', {
				plugins: ['lodash'],
				presets: ['es2015']
			})
			.transform('envify', {
				_: 'purge',
				NODE_ENV: process.env.NODE_ENV
			})
			.bundle()
			.pipe(fs.createWriteStream('./dist/index.js'))
	},

	css () {
		debug('build css files')
	}
}
