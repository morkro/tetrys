const { outputFile } = require('fs-promise')
const sass = require('node-sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const { defineNodeEnvOutput } = require('./utils')
const debug = require('debug')('tetrys:build:css')

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
 * Compiles the Sass files to CSS, returns it in a Promise.
 * @return {Promise}
 */
function compileSass () {
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

module.exports = () => {
	debug('build css files')
	return compileSass()
		.then(applyPostCSS)
		.catch(debug)
}
