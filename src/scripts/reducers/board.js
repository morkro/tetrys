import {
	BOARD_FREEZE,
	BOARD_LINE_REMOVE,
	BOARD_COLUMNS,
	BOARD_ROWS
} from '../constants/board'
import { getEmptyGrid } from '../utils/board'
import { getActiveBlock } from '../selectors'

const initialState = {
	columns: BOARD_COLUMNS,
	rows: BOARD_ROWS,
	grid: getEmptyGrid()
}

function freeze ({ shape, grid }) {
	const block = getActiveBlock()
	const newGrid = grid
	for (let y = 0; y < shape.length; ++y) {
		for (let x = 0; x < shape.length; ++x) {
			if (shape[y][x]) {
				newGrid[y + block.row][x + block.column] = shape[y][x]
			}
		}
	}
	return newGrid
}

function removeLine (grid) {
	const newGrid = grid
	for (let y = BOARD_ROWS - 1; y >= 0; --y) {
		let filledRow = true
		for (let x = 0; x < BOARD_COLUMNS; ++x) {
			if (grid[y][x] === 0) {
				filledRow = false
				break
			}
		}
		if (filledRow) {
			for (let yy = y; yy > 0; --yy) {
				for (let x = 0; x < BOARD_COLUMNS; ++x) {
					newGrid[yy][x] = grid[yy - 1][x]
				}
			}
			++y
		}
	}
	return newGrid
}

export default function Board (state = initialState, action) {
	switch (action.type) {
	case BOARD_FREEZE:
		return Object.assign({}, state, {
			grid: freeze({ shape: action.shape, grid: state.grid })
		})
	case BOARD_LINE_REMOVE:
		return Object.assign({}, state, {
			grid: removeLine(state.grid)
		})
	default:
		return state
	}
}
