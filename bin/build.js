const fs = require('fs-extra')
const mustache = require('mustache')
const browserify = require('browserify')
const sass = require('node-sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const debug = require('debug')('tetrys:build')
const { NODE_ENV } = process.env

function defineSassOutput () {
	if (NODE_ENV === 'production') {
		return 'compressed'
	}
	return 'nested'
}

function definePostCssPlugins () {
	const prefixed = autoprefixer({ browsers: ['last 2 versions'] })
	if (NODE_ENV === 'production') {
		return [prefixed, cssnano]
	}
	return [prefixed]
}

module.exports = {
	html () {
		debug('build html files')

		const template = fs.readFileSync('./src/index.html').toString()
		const meta = fs.readFileSync('./src/views/meta.html').toString()
		const menu = fs.readFileSync('./src/views/menu.html').toString()
		const game = fs.readFileSync('./src/views/game.html').toString()
		const score = fs.readFileSync('./src/views/score.html').toString()

		fs.outputFile(
			'./dist/index.html',
			mustache.render(template, {}, { meta, menu, game, score }),
			(fsError) => {
				if (fsError) debug(fsError)
			}
		)
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

	scripts () {
		debug('build javascript')
		browserify('./src/scripts/index.js')
			.transform('babelify', {
				plugins: ['lodash'],
				presets: ['es2015']
			})
			.transform('envify', {
				_: 'purge',
				NODE_ENV
			})
			.bundle()
			.pipe(fs.createWriteStream('./dist/index.js'))
	},

	css () {
		debug('build css files')
		sass.render({
			file: './src/styles/main.scss',
			outFile: './dist/main.css',
			outputStyle: defineSassOutput()
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
