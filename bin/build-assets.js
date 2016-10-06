const { outputFile, readFile, copy } = require('fs-promise')
const { addDateToFile } = require('./utils')
const debug = require('debug')('tetrys:build:assets')

/**
 * Moves `manifest.json` to dist directory.
 * @return {Promise}
 */
function moveManifestJson () {
	debug('move manifest')
	return copy('./src/meta/manifest.json', './dist/manifest.json', { clobber: true })
		.catch(debug)
}

/**
 * Updates `humans.txt` with current date and moves it to dist directory.
 * @return {Promise}
 */
function moveHumansTxt () {
	debug('move and update humans.txt')
	return readFile('./src/meta/humans.txt', 'utf8')
		.then(addDateToFile)
		.then(file => outputFile('./dist/humans.txt', file))
		.catch(debug)
}

/**
 * Moves all images to dist directory.
 * @return {Promise}
 */
function moveImages () {
	debug('move all images')
	return copy('./src/images', './dist/images', { clobber: true })
		.catch(debug)
}

module.exports = () =>
	moveManifestJson()
		.then(() => moveHumansTxt())
		.then(() => moveImages())
