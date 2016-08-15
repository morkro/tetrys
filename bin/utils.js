const { NODE_ENV } = process.env

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

module.exports = {
	defineNodeEnvOutput,
	addDateToFile
}
