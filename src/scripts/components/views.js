import store from '../store'
import { getRoute } from '../selectors'

const $body = document.body

function updateBodyClass () {
	$body.className = $body.className.replace(
		/page-(.*)/g, `page-${getRoute()}`
	)
}

function addEvents () {
	store.subscribe(updateBodyClass)
}

export default { addEvents }
