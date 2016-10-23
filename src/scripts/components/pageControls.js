import { $$ } from '../utils/dom'
import {
	endGame,
	moveTetromino,
	rotateTetromino,
	addScore,
	clearCurrentScore
} from '../actions'

/**
 * @class PageControls
 */
export default class PageControls {
	constructor (store) {
		this.$buttons = [...$$('button, [role=button]')]
		this.store = store
	}

	/**
	 * Event handler that depending on the `data-` attributes of an element either updates
	 * the view or store.dispatches actions.
	 * @param {HTMLElement} target
	 * @return {undefined}
	 */
	onClick ({ target }) {
		const node = target.hasAttribute('data-action') ? target : target.closest('[data-action]')
		if (node === null) return

		switch (node.getAttribute('data-action')) {
		case 'pauseGame':
			this.store.dispatch(endGame())
			this.store.dispatch(addScore())
			this.store.dispatch(clearCurrentScore())
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

		node.blur()
	}

	/**
	 * Adds event listener to buttons.
	 * @return {undefined}
	 */
	addEvents () {
		this.$buttons.forEach($btn => {
			$btn.addEventListener('click', this.onClick.bind(this))
			$btn.addEventListener('touchstart', this.onClick.bind(this))
		})
	}
}
