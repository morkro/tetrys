import store from '../store'
import { isRunning } from '../selectors'
import { moveTetromino, rotateTetromino } from '../actions/tetromino'
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
		return store.dispatch(moveTetromino('LEFT'))
	case RIGHT_ARROW:
		return store.dispatch(moveTetromino('RIGHT'))
	case SPACE_BAR:
	case UP_ARROW:
		return store.dispatch(rotateTetromino())
	default:
		return
	}
}

function addEvents () {
	window.addEventListener('keydown', onPressKeydown)
}

export default { addEvents }
