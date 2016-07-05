import SHAPES from '../constants/shapes';
import { setActiveBlock } from '../actions/activeBlock';
import store from '../store';

export default class Tetromino {
	constructor () {
		this.randomID = Math.floor(Math.random() * SHAPES.all.length);
		this.identifier = SHAPES.all[this.randomID];
		this.shape = SHAPES[this.identifier];
		this.state = [];
	}

	add () {
		for (let y = 0; y < 4; y++) {
			this.state[y] = [];
			for (let x = 0; x < 4; x++) {
				if (this.shape[4 * y + x]) {
					this.state[y][x] = this.randomID + 1;
				}
				else {
					this.state[y][x] = 0;
				}
			}
		}
		store.dispatch(setActiveBlock(this.identifier, this.state));
	}
}
