import { TETROMINO_ADD, TETROMINO_MOVE, TETROMINO_ROTATE } from '../constants/tetromino'

export function addTetromino ({ identifier, shape, column }) {
	return {
		type: TETROMINO_ADD,
		identifier,
		shape,
		column,
		row: 0
	}
}

export function moveTetromino (direction) {
	return {
		type: TETROMINO_MOVE,
		direction
	}
}

export function rotateTetromino (shape) {
	return {
		type: TETROMINO_ROTATE,
		shape
	}
}
