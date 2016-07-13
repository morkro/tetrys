import * as type from '../constants/actionTypes'
import { BOARD_COLUMNS, BOARD_ROWS } from '../constants/board'
import { getEmptyGrid } from '../utils/board'
import * as _ from '../selectors'

const initialState = {
	columns: BOARD_COLUMNS,
	rows: BOARD_ROWS,
	grid: getEmptyGrid()
}

function freeze ({ shape, grid }) {
	const block = _.getActiveBlock()
	const newGrid = grid
	for (let y = 0; y < shape.length; y++) {
		for (let x = 0; x < shape.length; x++) {
			if (shape[y][x]) {
				newGrid[y + block.row][x + block.column] = shape[y][x]
			}
		}
	}
	return newGrid
}

function removeLine (grid) {
	return grid
}

export default function Board (state = initialState, action) {
	switch (action.type) {
	case type.BOARD_FREEZE:
		return Object.assign({}, state, {
			grid: freeze({ shape: action.shape, grid: state.grid })
		})
	case type.BOARD_LINE_REMOVE:
		return Object.assign({}, state, {
			grid: removeLine(state.grid)
		})
	default:
		return state
	}
}
