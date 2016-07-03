import { $ } from '../helpers/dom';
import store from '../store';
import { isRunning } from '../store/connect';

export default class Canvas {
	constructor (canvas) {
		this.canvas = $(canvas);
		this.context = this.canvas.getContext('2d');
		this.wrapper = this.canvas.parentNode;
	}

	setSize () {
		this.canvas.width = this.wrapper.offsetWidth;
		this.canvas.height = this.wrapper.offsetHeight;
	}

	fillBackground () {
		this.context.fillStyle = '#f1f1f1';
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	startGame () {
		if (isRunning()) {
			console.log('start the loop');
		}
	}

	init () {
		this.setSize();
		this.fillBackground();
		store.subscribe(this.startGame);
	}
}
