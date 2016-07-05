import Stats from 'stats.js';
import { $ } from '../helpers/dom';
import store from '../store';
import Tetromino from '../components/tetromino';
import {
	isRunning,
	getColumnsSize,
	getRowSize,
	getGrid,
	getActiveBlockShape,
	getActiveBlockPosition
} from '../store/connect';

const { requestAnimationFrame, cancelAnimationFrame } = window;

export default class Canvas {
	constructor (canvas) {
		this.canvas = $(canvas);
		this.context = this.canvas.getContext('2d');
		this.wrapper = this.canvas.parentNode;
		this.width = this.wrapper.offsetWidth;
		this.height = this.wrapper.offsetHeight;
		this.blockWidth = this.width / getColumnsSize();
		this.blockHeight = this.height / getRowSize();
		this.animationFrame = null;

		if (process.env.NODE_ENV === 'development') {
			this.stats = new Stats();
		}
	}

	appendStats () {
		this.stats.showPanel(0);
		document.body.appendChild(this.stats.dom);
	}

	setSize () {
		this.canvas.width = this.width = this.wrapper.offsetWidth;
		this.canvas.height = this.height = this.wrapper.offsetHeight;
		this.blockWidth = this.width / getColumnsSize();
		this.blockHeight = this.height / getRowSize();
	}

	toggleGameState () {
		if (isRunning()) this.loop();
		else this.cancelLoop();
	}

	setBlockStyle ({ fill, stroke } = {}) {
		this.context.fillStyle = fill;
		this.context.strokeStyle = stroke;
	}

	drawBlock (x, y) {
		this.context.fillRect(
			this.blockWidth * x, this.blockHeight * y,
			this.blockWidth - 1, this.blockHeight - 1
		);
		this.context.strokeRect(
			this.blockWidth * x, this.blockHeight * y,
			this.blockWidth - 1, this.blockHeight - 1
		);
	}

	loop () {
		if (process.env.NODE_ENV === 'development') this.stats.begin();
		this.context.clearRect(0, 0, this.width, this.height);
		this.setBlockStyle({ fill: '#f1f1f1', stroke: 'white' });

		for (let x = 0; x < getColumnsSize(); x++) {
			for (let y = 0; y < getRowSize(); y++) {
				// if (getGrid()[y][x]) {
				this.drawBlock(x, y);
				// }
			}
		}

		this.setBlockStyle({ fill: 'red', stroke: 'white' });

		for (let y = 0; y < 4; y++) {
			for (let x = 0; x < 4; x++) {
				if (getActiveBlockShape()[y][x]) {
					this.drawBlock(
						getActiveBlockPosition().column + x,
						getActiveBlockPosition().row + y
					);
				}
			}
		}

		if (process.env.NODE_ENV === 'development') this.stats.end();
		this.animationFrame = requestAnimationFrame(this.loop.bind(this));
	}

	cancelLoop () {
		cancelAnimationFrame(this.animationFrame);
	}

	init () {
		const block = new Tetromino();
		if (process.env.NODE_ENV === 'development') {
			this.appendStats();
		}

		this.setSize();
		block.add();
		this.loop();
		store.subscribe(this.toggleGameState.bind(this));
	}
}
