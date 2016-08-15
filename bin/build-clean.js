const { emptyDir, mkdirp } = require('fs-promise')
const debug = require('debug')('tetrys:build:clean')

const dist = './dist'

module.exports = () => {
	debug('empty dist directory')
	return emptyDir(dist)
		.then(() => mkdirp(dist))
}
