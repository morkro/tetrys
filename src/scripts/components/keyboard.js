import * as key from '../constants/keyCode';
import store from '../store';
import { isRunning } from '../store/connect';
import { moveActiveBlock } from '../actions/activeBlock';

export default class Keyboard {
	static addEvents () {
		window.addEventListener('keydown', this.onPressKeydown);
	}

	static onPressKeydown ({ keyCode }) {
		if (isRunning()) {
			switch (keyCode) {
			case key.LEFT_ARROW:
				return store.dispatch(moveActiveBlock('LEFT'));
			case key.RIGHT_ARROW:
				return store.dispatch(moveActiveBlock('RIGHT'));
			case key.SPACE_BAR:
			case key.UP_ARROW:
			default:
				return;
			}
		}
	}
}
