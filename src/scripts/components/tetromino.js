import SHAPES from '../constants/shapes'

export default class Tetromino {
	constructor () {
		this.randomID = Math.floor(Math.random() * Object.keys(SHAPES).length)
		this.identifier = Object.keys(SHAPES)[this.randomID]
		this.shape = SHAPES[this.identifier]
		this.column = 5

		if (this.identifier === 'I' || this.identifier === 'O') {
			this.column = 4
		}

		return {
			identifier: this.identifier,
			shape: this.shape,
			column: this.column,
			row: 0
		}
	}
}
