import { BOARD_COLUMNS, BOARD_ROWS } from '../constants/board'

/**
 * Returns a new empty grid.
 * @return {Array}
 */
export function getEmptyGrid () {
	const grid = []

	for (let i = 0; i < BOARD_ROWS; i++) {
		grid[i] = []
		for (let j = 0; j < BOARD_COLUMNS; j++) {
			grid[i].push(0)
		}
	}

	return grid
}

/**
 * Checks if the an array (tetromino) is still in the valid grid boundaries.
 * @param {Array} active
 * @param {Array} grid
 * @param {Number} offsetX
 * @param {Number} offsetY
 * @param {Array} tetromino
 * @return {Boolean}
 */
export function validBoardBoundary ({
	active = [],
	grid = [],
	offsetX = 0,
	offsetY = 0,
	tetromino = []
} = {}) {
	const newOffsetX = active.column + offsetX
	const newOffsetY = active.row + offsetY
	let shape = tetromino

	if (shape.length === 0) {
		shape = active.shape
	}

	for (let y = 0; y < shape.length; ++y) {
		for (let x = 0; x < shape.length; ++x) {
			if (shape[y][x]) {
				if (
					typeof grid[y + newOffsetY] === 'undefined' ||
					typeof grid[y + newOffsetY][x + newOffsetX] === 'undefined' ||
					grid[y + newOffsetY][x + newOffsetX] ||
					x + newOffsetX < 0 ||
					y + newOffsetY >= BOARD_ROWS ||
					x + newOffsetX >= BOARD_COLUMNS
				) {
					return false
				}
			}
		}
	}

	return true
}

/**
 * Rotates elements of an array (tetromino) and returns the new shape as array.
 * @param {Array} current
 * @return {Array}
 */
export function rotate (current) {
	const newCurrent = []
	for (let y = 0; y < current.length; ++y) {
		newCurrent[y] = []
		for (let x = 0; x < current.length; ++x) {
			newCurrent[y][x] = current[(current.length - 1) - x][y]
		}
	}
	return newCurrent
}

/**
 * Returns a modified array of the `board` parameter, with the position of `tetromino`
 * @param {Array} tetromino
 * @param {Array} board
 * @return {Array}
 */
export function freezeBoard ({ tetromino, board } = {}) {
	const newBoard = board
	for (let y = 0; y < tetromino.shape.length; ++y) {
		for (let x = 0; x < tetromino.shape.length; ++x) {
			if (tetromino.shape[y][x]) {
				newBoard[y + tetromino.row][x + tetromino.column] = tetromino.shape[y][x]
			}
		}
	}
	return newBoard
}

/**
 * Modifies `board` by removing a full list of columns.
 * @param {Array} board
 * @return {Array}
 */
export function removeLineFromBoard (board) {
	const newBoard = board
	for (let y = BOARD_ROWS - 1; y >= 0; --y) {
		let filledRow = true
		for (let x = 0; x < BOARD_COLUMNS; ++x) {
			if (board[y][x] === 0) {
				filledRow = false
				break
			}
		}
		if (filledRow) {
			for (let yy = y; yy > 0; --yy) {
				for (let x = 0; x < BOARD_COLUMNS; ++x) {
					newBoard[yy][x] = board[yy - 1][x]
				}
			}
			++y
		}
	}
	return newBoard
}
