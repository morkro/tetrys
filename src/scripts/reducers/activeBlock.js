import * as type from '../constants/actionTypes'
import { BOARD_COLUMNS } from '../constants/game'

const initialState = {
	identifier: '',
	shape: [],
	column: Math.floor(BOARD_COLUMNS / 2),
	row: 0
}

function rotate (current) {
	const newCurrent = []
	for (let y = 0; y < current.length; y++) {
		newCurrent[y] = []
		for (let x = 0; x < current.length; x++) {
			newCurrent[y][x] = current[(current.length - 1) - x][y]
		}
	}
	return newCurrent
}

export default function activeBlock (state = initialState, action) {
	switch (action.type) {
	case type.SET_ACTIVE_BLOCK:
		return Object.assign({}, state, {
			identifier: action.identifier,
			shape: action.shape
		})
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
	case type.ROTATE_ACTIVE_BLOCK:
		return Object.assign({}, state, {
			shape: rotate(state.shape)
		})
	default:
		return state
	}
}
