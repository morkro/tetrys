import { $$ } from '../helpers/dom';
import store from '../store';
import { startGame, endGame } from '../actions/game';

export default class Controls {
	constructor (controls) {
		this.controls = $$(controls);
	}

	addEvents () {
		[...this.controls].forEach(
			(btn) => btn.addEventListener('click', this.onClickControls)
		);
	}

	onClickControls () {
		switch (this.getAttribute('data-control')) {
		case 'start':
			return store.dispatch(startGame());
		case 'end':
			return store.dispatch(endGame());
		default:
			return;
		}
	}
}
