import store from '../store'
import { isRunning } from '../selectors'
import { moveTetromino, rotateTetromino } from '../actions/tetromino'
import { LEFT_ARROW, RIGHT_ARROW, UP_ARROW, SPACE_BAR } from '../constants/keyCode'

/**
 * Takes an event object and dispatches different tetromino actions.
 * @alias onPressKeydownEvent
 * @param {Number} keyCode
 * @returns {undefined|ReduxState}
 */
export function onPressKeydownEvent ({ keyCode }) {
	if (!isRunning()) return

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

/**
 * Adds event listener to `window` object.
 * @return {undefined}
 */
export default function addKeyboardEvents () {
	window.addEventListener('keydown', onPressKeydownEvent)
}
