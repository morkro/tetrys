import { $ } from '../helpers/dom'
import store from '../store'
import { startGame, endGame } from '../actions/game'
import { rotateActiveBlock } from '../actions/activeBlock'

export default class Controls {
	constructor (controls) {
		this.controls = $(controls)
	}

	addEvents () {
		this.controls.addEventListener('click', this.onClickControls)
	}

	onClickControls ({ target }) {
		if (target.nodeName === 'BUTTON') {
			target.blur()

			switch (target.getAttribute('data-control')) {
			case 'start':
				return store.dispatch(startGame())
			case 'end':
				return store.dispatch(endGame())
			case 'rotate':
				return store.dispatch(rotateActiveBlock())
			default:
				return
			}
		}
	}
}
