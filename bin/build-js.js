const { createWriteStream } = require('fs-promise')
const browserify = require('browserify')
const { defineNodeEnvOutput } = require('./utils')
const debug = require('debug')('tetrys:build:js')

/**
 * Transpiles JavaScript using Browserify, Babelify, and Envify.
 * @param {String} fileName
 * @param {String} outputFileName
 * @param {String} ignoreFile
 * @param {Array}  plugins
 * @param {Object} params
 * @return {Promise}
 */
function transpile ({
	fileName = '',
	outputFileName = fileName,
	ignoreFile = '',
	plugins = [],
	params = {}
} = {}) {
	return new Promise((resolve, reject) => {
		const stream = browserify(`./src/scripts/${fileName}.js`)
			.ignore(ignoreFile)
			.transform('babelify', { plugins, presets: ['latest'] })
			.transform('envify', Object.assign({ _: 'purge' }, params))
			.bundle()
			.pipe(createWriteStream(`./dist/${outputFileName}.js`))
		stream.on('error', reject)
		stream.on('finish', resolve)
	})
}

module.exports = {
	transpile,

	main () {
		debug('create main.js')
		return transpile({
			fileName: 'index',
			outputFileName: 'main',
			ignoreFile: defineNodeEnvOutput({ prod: 'stats.js', dev: '' }),
			plugins: ['lodash'],
			params: { NODE_ENV: process.env.NODE_ENV }
		})
	},

	worker () {
		debug('create serviceworker')
		return transpile({
			fileName: 'worker',
			params: { PACKAGE_VERSION: process.env.npm_package_version }
		})
	}
}
