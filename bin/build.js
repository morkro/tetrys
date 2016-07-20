const fs = require('fs-extra')
const mustache = require('mustache')
const browserify = require('browserify')
const sass = require('node-sass')
const debug = require('debug')('tetrys:build')
const { NODE_ENV } = process.env

function defineSassOutput () {
	if (NODE_ENV === 'production') {
		return 'compressed'
	}
	return 'nested'
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

	manifest () {
		debug('move manifest')
		fs.copy('./src/manifest.json', './dist/manifest.json',
			{ clobber: true },
			(error) => {
				if (error) return debug(`Error moving manifest.json: ${error}`)
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
		}, (sassError, result) => {
			if (sassError) {
				debug(sassError.status)
				debug(sassError.column)
				debug(sassError.message)
				debug(sassError.line)
				return
			}
			fs.outputFile('./dist/main.css', result.css, (fsError) => {
				if (fsError) debug(fsError)
			})
		})
	}
}
