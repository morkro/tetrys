import { $ } from '../utils/dom'
import store from '../store'
import Tetromino from '../components/tetromino'
import { startGame, endGame } from '../actions/game'
import { setActiveBlock, moveActiveBlock } from '../actions/activeBlock'

export default class Controls {
	constructor (controls) {
		this.controls = $(controls)
	}

	addEvents () {
		this.controls.addEventListener('click', this.onClickControls)
	}

	onClickControls ({ target }) {
		if (target.nodeName === 'BUTTON') {
			const attr = target.getAttribute('data-control')
			target.blur()

			switch (attr) {
			case 'start':
				store.dispatch(startGame())
				store.dispatch(setActiveBlock(new Tetromino()))
				return
			case 'end':
				return store.dispatch(endGame())
			case 'left':
			case 'right':
				return store.dispatch(moveActiveBlock(attr.toUpperCase()))
			default:
				return
			}
		}
	}
}
