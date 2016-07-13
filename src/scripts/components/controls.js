import { $ } from '../helpers/dom'
import store from '../store'
import { startGame, endGame } from '../actions/game'
import { rotateActiveBlock, moveActiveBlock } from '../actions/activeBlock'

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
				return store.dispatch(startGame())
			case 'end':
				return store.dispatch(endGame())
			case 'rotate':
				return store.dispatch(rotateActiveBlock())
			case 'left':
			case 'right':
				return store.dispatch(moveActiveBlock(attr.toUpperCase()))
			default:
				return
			}
		}
	}
}
