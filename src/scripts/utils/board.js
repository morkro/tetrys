import { BOARD_COLUMNS, BOARD_ROWS } from '../constants/board'
import { getTetromino, getGrid, getBoardRows, getBoardColumns } from '../selectors'

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

export function validBoardBoundary ({
	offsetX = 0,
	offsetY = 0,
	tetromino = []
} = {}) {
	const activeBlock = getTetromino()
	const newOffsetX = activeBlock.column + offsetX
	const newOffsetY = activeBlock.row + offsetY
	let shape = tetromino

	if (shape.length === 0) {
		shape = activeBlock.shape
	}

	for (let y = 0; y < shape.length; ++y) {
		for (let x = 0; x < shape.length; ++x) {
			if (shape[y][x]) {
				const grid = getGrid()
				if (
					typeof grid[y + newOffsetY] === 'undefined' ||
					typeof grid[y + newOffsetY][x + newOffsetX] === 'undefined' ||
					grid[y + newOffsetY][x + newOffsetX] ||
					x + newOffsetX < 0 ||
					y + newOffsetY >= getBoardRows() ||
					x + newOffsetX >= getBoardColumns()
				) {
					// if (x + newOffsetX >= _.getBoardColumns() ||
					// y + newOffsetY >= _.getBoardRows()) {
					// 	console.group()
					// 	console.log('x =>', x)
					// 	console.log('newOffsetX =>', newOffsetX)
					// 	console.log('x + newOffsetX', x + newOffsetX)
					// 	console.log('_.getBoardColumns()', _.getBoardColumns())
					// 	console.log('y =>', y)
					// 	console.log('newOffsetY =>', newOffsetY)
					// 	console.log('y + newOffsetY', y + newOffsetY)
					// 	console.log('_.getBoardRows()', _.getBoardRows())
					// 	console.groupEnd()
					// }

					return false
				}
			}
		}
	}

	return true
}
