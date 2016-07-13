import SHAPES from '../constants/shapes'

export default class Tetromino {
	constructor () {
		this.randomID = Math.floor(Math.random() * Object.keys(SHAPES).length)
		this.identifier = Object.keys(SHAPES)[this.randomID]
		this.shape = SHAPES[this.identifier]

		return {
			identifier: this.identifier,
			shape: this.shape
		}
	}
}
