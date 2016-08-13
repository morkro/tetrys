const fs = require('fs-extra')
const mustache = require('mustache')
const browserify = require('browserify')
const sass = require('node-sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const debug = require('debug')('tetrys:build')

const { NODE_ENV, npm_package_version: PACKAGE_VERSION } = process.env

function defineNodeEnvOutput ({ prod = '', dev = '' } = {}) {
	if (NODE_ENV === 'production') {
		return prod
	}
	return dev
}

function definePostCssPlugins () {
	const prefixed = autoprefixer({ browsers: ['last 2 versions'] })
	return defineNodeEnvOutput({
		prod: [prefixed, cssnano],
		dev: [prefixed]
	})
}

function getFileString (file = 'index') {
	if (file === 'index') {
		return fs.readFileSync(`./src/${file}.html`).toString()
	}
	return fs.readFileSync(`./src/views/${file}.html`).toString()
}

module.exports = {
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

		fs.outputFile('./dist/index.html', output, (fsError) => {
			if (fsError) debug(fsError)
		})
	},

	assets () {
		debug('move manifest')
		fs.copy('./src/manifest.json', './dist/manifest.json',
			{ clobber: true },
			(error) => {
				if (error) return debug(`Error moving manifest.json: ${error}`)
			}
		)

		debug('move and update humans.txt')
		fs.readFile('./src/humans.txt', 'utf8', (error, result) => {
			if (error) return debug(error)

			const date = new Date()
			const year = date.getFullYear()
			let month = date.getMonth()
			let day = date.getDay()

			if (month < 10) month = `0${month}`
			if (day < 10) day = `0${day}`

			fs.outputFile('./dist/humans.txt',
				result.replace('YYYY/MM/DD', `${year}/${month}/${day}`)
			)
		})
	},

	scripts ({ main, worker } = {}) {
		if (!arguments.length || main) {
			debug('create main.js')
			browserify('./src/scripts/index.js')
				.ignore(defineNodeEnvOutput({ prod: 'stats.js', dev: '' }))
				.transform('babelify', { plugins: ['lodash'], presets: ['es2015'] })
				.transform('envify', { _: 'purge', NODE_ENV })
				.bundle()
				.pipe(fs.createWriteStream('./dist/main.js'))
		}

		if (!arguments.length || worker) {
			debug('create serviceworker')
			browserify('./src/scripts/worker.js')
				.transform('babelify', { presets: ['es2015'] })
				.transform('envify', { _: 'purge', PACKAGE_VERSION })
				.bundle()
				.pipe(fs.createWriteStream('./dist/worker.js'))
		}
	},

	css () {
		debug('build css files')
		sass.render({
			file: './src/styles/main.scss',
			outFile: './dist/main.css',
			outputStyle: defineNodeEnvOutput({
				prod: 'compressed',
				dev: 'nested'
			})
		}, (error, compiled) => {
			if (error) {
				debug(error.status)
				debug(error.column)
				debug(error.message)
				debug(error.line)
				return
			}

			postcss(definePostCssPlugins()).process(compiled.css).then((result) => {
				result.warnings().forEach(warn => debug(warn.toString()))
				fs.outputFile('./dist/main.css', result.css, (fsError) => {
					if (fsError) debug(fsError)
				})
			})
		})
	}
}
