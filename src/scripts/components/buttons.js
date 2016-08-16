import { $$ } from '../utils/dom'
import store from '../store'
import changeRoute from '../actions/route'

const $buttons = [...$$('button')]

function onClickButton ({ target }) {
	if (target.nodeName !== 'BUTTON') return
	const dataRoute = target.getAttribute('data-route')

	if (dataRoute) {
		store.dispatch(changeRoute(dataRoute))
	}

	target.focus()
	target.blur()
}

function addEvents () {
	$buttons.forEach($btn => $btn.addEventListener('click', onClickButton))
}

export default { addEvents }
