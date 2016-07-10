import * as type from '../constants/actionTypes'
import { BOARD_COLUMNS } from '../constants/game'

const initialState = {
	identifier: '',
	shape: [],
	column: Math.floor(BOARD_COLUMNS / 2),
	row: 0
}

export default function activeBlock (state = initialState, action) {
	switch (action.type) {
	case type.SET_ACTIVE_BLOCK: {
		const { identifier, shape } = action
		return Object.assign({}, state, { identifier, shape })
	}
	case type.MOVE_ACTIVE_BLOCK: {
		switch (action.direction) {
		case 'LEFT':
			return Object.assign({}, state, { column: state.column - 1 })
		case 'RIGHT':
			return Object.assign({}, state, { column: state.column + 1 })
		case 'DOWN':
			return Object.assign({}, state, { row: state.row + 1 })
		default:
			return state
		}
	}
	default:
		return state
	}
}
