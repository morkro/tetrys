import { $$ } from '../utils/dom'
import { startGame, endGame } from '../actions/game'
import { addTetromino, moveTetromino, rotateTetromino } from '../actions/tetromino'
import Tetromino from './tetromino'

/**
 * @class PageControls
 */
export default class PageControls {
	constructor ({ selector, store } = {}) {
		this.$buttons = [...$$(selector)]
		this.store = store
	}

	/**
	 * Event handler that depending on the `data-` attributes of an element either updates
	 * the view or store.dispatches actions.
	 * @param {HTMLElement} target
	 * @return {undefined}
	 */
	onClick ({ target }) {
		switch (target.getAttribute('data-action')) {
		case 'startGame':
			this.store.dispatch(addTetromino(new Tetromino()))
			this.store.dispatch(startGame())
			break
		case 'pauseGame':
			this.store.dispatch(endGame())
			break
		case 'moveTetrominoLeft':
			this.store.dispatch(moveTetromino('LEFT'))
			break
		case 'moveTetrominoRight':
			this.store.dispatch(moveTetromino('RIGHT'))
			break
		case 'rotateBlock':
			this.store.dispatch(rotateTetromino())
			break
		default:
			break
		}

		target.blur()
	}

	/**
	 * Adds event listener to buttons.
	 * @return {undefined}
	 */
	addEvents () {
		this.$buttons.forEach(
			$btn => $btn.addEventListener('click', this.onClick.bind(this))
		)
	}
}
