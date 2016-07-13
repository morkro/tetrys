import * as type from '../constants/actionTypes'
import { BOARD_COLUMNS, BOARD_ROWS } from '../constants/game'
import { getEmptyGrid } from '../helpers/game'

const initialState = {
	isRunning: false,
	columns: BOARD_COLUMNS,
	rows: BOARD_ROWS,
	grid: getEmptyGrid()
}

export default function game (state = initialState, action) {
	switch (action.type) {
	case type.GAME_START:
	case type.GAME_END:
		return Object.assign({}, state, { isRunning: action.isRunning })
	default:
		return state
	}
}
