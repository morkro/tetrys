const mustache = require('mustache')
const browserify = require('browserify')
const sass = require('node-sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const debug = require('debug')('tetrys:build')
const {
	outputFile,
	readFile,
	copy,
	createWriteStream
} = require('fs-promise')

const { NODE_ENV, npm_package_version: PACKAGE_VERSION } = process.env

/**
 * Checks the `NODE_ENV` and returns passed parameter based on that.
 * @param {String|Object} prod
 * @param {String|Object} dev
 * @return {Object|String}
 */
function defineNodeEnvOutput ({ prod = '', dev = '' } = {}) {
	if (NODE_ENV === 'production') {
		return prod
	}
	return dev
}

/**
 * Returns the PostCSS plugins based on `NODE_ENV`.
 * @return {Array}
 */
function definePostCssPlugins () {
	const prefixed = autoprefixer({ browsers: ['last 2 versions'] })
	return defineNodeEnvOutput({
		prod: [prefixed, cssnano],
		dev: [prefixed]
	})
}

/**
 * Returns the path to the HTML view.
 * @param {String} fileName
 * @return {Promise}
 */
function getFileString (fileName = 'index') {
	const path = (fileName === 'index') ? fileName : `views/${fileName}`
	return readFile(`./src/${path}.html`).toString()
}

/**
 * Overwrites `YYYY/MM/DD` in a file with the current date.
 * @param {String} file
 * @return {String}
 */
function addDateToFile (file) {
	const date = new Date()
	const year = date.getUTCFullYear()
	let month = date.getUTCMonth() + 1
	let day = date.getUTCDate()

	if (month < 10) month = `0${month}`
	if (day < 10) day = `0${day}`

	return file.replace('YYYY/MM/DD', `${year}/${month}/${day}`)
}

/**
 * Compiles the Sass files to CSS, returns it in a Promise.
 * @return {Promise}
 */
function renderSass () {
	return new Promise((resolve, reject) => {
		sass.render({
			file: './src/styles/main.scss',
			outFile: './dist/main.css',
			outputStyle: defineNodeEnvOutput({
				prod: 'compressed',
				dev: 'nested'
			})
		}, (error, compiled) => {
			if (error) reject(error)
			resolve(compiled)
		})
	})
}

/**
 * Takes the compiled CSS from Sass renderer and applies PostCSS plugins.
 * @param {String} css
 * @return {Promise}
 */
function applyPostCSS ({ css }) {
	return postcss(definePostCssPlugins())
		.process(css)
		.then(result => outputFile('./dist/main.css', result.css))
}

module.exports = {
	/**
	 * Creates the HTML view using Mustache.js and re
	 * @return {Promise}
	 */
	html () {
		debug('build html files')

		const output = mustache.render(getFileString('index'), {}, {
			meta: getFileString('meta'),
			menu: getFileString('menu'),
			game: getFileString('game'),
			score: getFileString('score'),
			about: getFileString('about')
			// settings: getFileString('settings')
		})

		return outputFile('./dist/index.html', output)
			.catch(debug)
	},

	assets () {
		debug('move manifest')
		copy('./src/manifest.json', './dist/manifest.json', { clobber: true })
			.catch((error) => debug(`Error moving manifest.json: ${error}`))

		debug('move and update humans.txt')
		readFile('./src/humans.txt', 'utf8')
			.then(addDateToFile)
			.then(file => outputFile('./dist/humans.txt', file))
			.catch(debug)
	},

	scripts ({ main, worker } = {}) {
		if (!arguments.length || main) {
			debug('create main.js')
			browserify('./src/scripts/index.js')
				.ignore(defineNodeEnvOutput({ prod: 'stats.js', dev: '' }))
				.transform('babelify', { plugins: ['lodash'], presets: ['es2015'] })
				.transform('envify', { _: 'purge', NODE_ENV })
				.bundle()
				.pipe(createWriteStream('./dist/main.js'))
		}

		if (!arguments.length || worker) {
			debug('create serviceworker')
			browserify('./src/scripts/worker.js')
				.transform('babelify', { presets: ['es2015'] })
				.transform('envify', { _: 'purge', PACKAGE_VERSION })
				.bundle()
				.pipe(createWriteStream('./dist/worker.js'))
		}
	},

	css () {
		debug('build css files')
		renderSass()
			.then(applyPostCSS)
			.catch(debug)
	}
}
