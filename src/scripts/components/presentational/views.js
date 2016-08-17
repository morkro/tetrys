const $body = document.body

/**
 * Assigns a new class name to the `<body>` element.
 * @param {String} route
 * @return {undefined}
 */
function updateBodyClass (route) {
	$body.className = $body.className.replace(/page-(.*)/g, `page-${route}`)
}

/**
 * Wrapper function for `updateBodyClass()`
 * @param {String} route
 * @return {undefined}
 */
export default function updateView (route) {
	return updateBodyClass(route)
}
