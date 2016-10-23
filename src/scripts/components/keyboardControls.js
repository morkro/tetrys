import { moveTetromino, rotateTetromino } from '../actions'
import { LEFT_ARROW, RIGHT_ARROW, UP_ARROW, SPACE_BAR } from '../constants/keyCode'
import { isRunning, getTetromino, getGrid } from '../store'
import { validBoardBoundary, rotate } from '../utils'

/**
 * @class KeyboardControls
 */
export default class KeyboardControls {
	constructor (store) {
		this.store = store
	}

	/**
	 * Wrapper function for `validBoardBoundary()`.
	 * @param {Object} config
	 * @return {Boolean}
	 */
	getBoundaries (config = {}) {
		const active = getTetromino(this.store)
		const grid = getGrid(this.store)
		return validBoardBoundary(Object.assign({ active, grid }, config))
	}

	/**
	 * Takes an event object and dispatches different tetromino actions.
	 * @param {Number} keyCode
	 * @returns {undefined|ReduxState}
	 */
	onKeydown ({ keyCode }) {
		if (!isRunning(this.store)) return

		switch (keyCode) {
		case LEFT_ARROW:
			if (this.getBoundaries({ offsetX: -1 })) {
				return this.store.dispatch(moveTetromino('LEFT'))
			}
			return
		case RIGHT_ARROW:
			if (this.getBoundaries({ offsetX: 1 })) {
				return this.store.dispatch(moveTetromino('RIGHT'))
			}
			return
		case SPACE_BAR:
		case UP_ARROW: {
			const tetromino = rotate(getTetromino(this.store).shape)
			if (this.getBoundaries({ tetromino })) {
				return this.store.dispatch(rotateTetromino(tetromino))
			}
			return
		}
		default:
			return
		}
	}

	/**
	 * Adds event listener to `window` object.
	 * @return {undefined}
	 */
	addEvents () {
		window.addEventListener('keydown', this.onKeydown.bind(this))
	}
}
