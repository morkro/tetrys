import store from '../store'
import { isRunning } from '../selectors'
import { moveActiveBlock, rotateActiveBlock } from '../actions/activeBlock'
import {
	LEFT_ARROW,
	RIGHT_ARROW,
	UP_ARROW,
	SPACE_BAR
} from '../constants/keyCode'

function onPressKeydown ({ keyCode }) {
	if (!isRunning()) {
		return
	}

	switch (keyCode) {
	case LEFT_ARROW:
		return store.dispatch(moveActiveBlock('LEFT'))
	case RIGHT_ARROW:
		return store.dispatch(moveActiveBlock('RIGHT'))
	case SPACE_BAR:
	case UP_ARROW:
		return store.dispatch(rotateActiveBlock())
	default:
		return
	}
}

function addEvents () {
	window.addEventListener('keydown', onPressKeydown)
}

export default { addEvents }
