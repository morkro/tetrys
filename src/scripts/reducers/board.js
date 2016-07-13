import * as type from '../constants/actionTypes'
import { BOARD_COLUMNS, BOARD_ROWS } from '../constants/board'
import { getEmptyGrid } from '../helpers/board'

const initialState = {
	columns: BOARD_COLUMNS,
	rows: BOARD_ROWS,
	grid: getEmptyGrid()
}

function freeze (grid) {
	return grid
}

function removeLine (grid) {
	return grid
}

export default function Board (state = initialState, action) {
	switch (action.type) {
	case type.BOARD_FREEZE:
		return Object.assign({}, state, {
			grid: freeze(state.grid)
		})
	case type.BOARD_LINE_REMOVE:
		return Object.assign({}, state, {
			grid: removeLine(state.grid)
		})
	default:
		return state
	}
}
