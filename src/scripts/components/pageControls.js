import { $$, validBoardBoundary, rotate } from '../utils'
import { getTetromino, getGrid } from '../store'
import { moveTetromino, rotateTetromino } from '../actions'
import {
	TETROMINO_MOVE_LEFT,
	TETROMINO_ROTATE,
	TETROMINO_MOVE_RIGHT
} from '../constants/tetromino'


/**
 * @class PageControls
 */
export default class PageControls {
	constructor (store) {
		this.$buttons = [...$$('button, [role=button]')]
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
	 * Event handler that depending on the `data-` attributes of an element either updates
	 * the view or store.dispatches actions.
	 * @param {HTMLElement} target
	 * @return {undefined}
	 */
	onClick ({ target }) {
		const $node = target.hasAttribute('data-action') ? target : target.closest('[data-action]')
		if ($node === null) return

		switch ($node.getAttribute('data-action')) {
		case TETROMINO_MOVE_LEFT:
			if (this.getBoundaries({ offsetX: -1 })) {
				this.store.dispatch(moveTetromino('LEFT'))
			}
			break
		case TETROMINO_MOVE_RIGHT:
			if (this.getBoundaries({ offsetX: 1 })) {
				this.store.dispatch(moveTetromino('RIGHT'))
			}
			break
		case TETROMINO_ROTATE: {
			const tetromino = rotate(getTetromino(this.store).shape)
			if (this.getBoundaries({ tetromino })) {
				this.store.dispatch(rotateTetromino(tetromino))
			}
			break
		}
		default:
			break
		}

		$node.blur()
	}

	/**
	 * Adds event listener to buttons.
	 * @return {undefined}
	 */
	addEvents () {
		this.$buttons.forEach($btn => {
			$btn.addEventListener('click', this.onClick.bind(this))
		})
	}
}
