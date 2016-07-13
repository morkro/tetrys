import { BOARD_COLUMNS } from '../../constants/board'
import * as type from '../../constants/actionTypes'
import validBoundaries from './boundaries'
import rotateBlock from './rotate'

const initialState = {
	identifier: '',
	shape: [],
	column: Math.floor(BOARD_COLUMNS / 2),
	row: 0
}

export default function ActiveBlock (state = initialState, action) {
	switch (action.type) {
	case type.ACTIVE_BLOCK_SET:
		return Object.assign({}, state, {
			identifier: action.identifier,
			shape: action.shape
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
			if (validBoundaries(0, 1)) {
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
