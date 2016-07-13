import { $ } from '../helpers/Dom'
import store from '../store'
import { startGame, endGame } from '../actions/Game'
import { rotateActiveBlock } from '../actions/ActiveBlock'

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
