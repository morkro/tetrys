import { BOARD_COLUMNS } from '../constants/board'
import * as type from '../constants/actionTypes'
import { validBoundaries } from '../utils/board'

const initialState = {
	identifier: '',
	shape: [],
	column: Math.floor(BOARD_COLUMNS / 2),
	row: 0
}

function rotateBlock (current) {
	const newCurrent = []
	for (let y = 0; y < current.length; y++) {
		newCurrent[y] = []
		for (let x = 0; x < current.length; x++) {
			newCurrent[y][x] = current[(current.length - 1) - x][y]
		}
	}
	return newCurrent
}

export default function ActiveBlock (state = initialState, action) {
	switch (action.type) {
	case type.ACTIVE_BLOCK_SET:
		return Object.assign({}, state, {
			identifier: action.identifier,
			shape: action.shape,
			colum: initialState.column,
			row: initialState.row
		})
	case type.ACTIVE_BLOCK_MOVE: {
		switch (action.direction) {
		case 'LEFT':
			if (validBoundaries(-2)) {
				return Object.assign({}, state, { column: state.column - 1 })
			}
			return state
		case 'RIGHT':
			if (validBoundaries(0)) {
				return Object.assign({}, state, { column: state.column + 1 })
			}
			return state
		case 'DOWN':
			if (validBoundaries(0, 0)) {
				return Object.assign({}, state, { row: state.row + 1 })
			}
			return state
		default:
			return state
		}
	}
	case type.ACTIVE_BLOCK_ROTATE: {
		const rotated = rotateBlock(state.shape)
		if (validBoundaries(0, 0, rotated)) {
			return Object.assign({}, state, { shape: rotated })
		}
		return state
	}
	default:
		return state
	}
}
