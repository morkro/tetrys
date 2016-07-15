import * as type from '../constants/actionTypes'
import { validBoardBoundary } from '../utils/board'

const initialState = {
	identifier: '',
	shape: [],
	column: 0,
	row: 0
}

function rotateBlock (current) {
	const newCurrent = []
	for (let y = 0; y < current.length; ++y) {
		newCurrent[y] = []
		for (let x = 0; x < current.length; ++x) {
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
			column: action.column,
			row: action.row
		})
	case type.ACTIVE_BLOCK_MOVE: {
		switch (action.direction) {
		case 'LEFT':
			if (validBoardBoundary({ offsetX: -1 })) {
				return Object.assign({}, state, { column: --state.column })
			}
			return state
		case 'RIGHT':
			if (validBoardBoundary({ offsetX: 1 })) {
				return Object.assign({}, state, { column: ++state.column })
			}
			return state
		case 'DOWN':
			if (validBoardBoundary({ offsetY: 1 })) {
				return Object.assign({}, state, { row: ++state.row })
			}
			return state
		default:
			return state
		}
	}
	case type.ACTIVE_BLOCK_ROTATE: {
		const tetromino = rotateBlock(state.shape)
		if (validBoardBoundary({ tetromino })) {
			return Object.assign({}, state, { shape: tetromino })
		}
		return state
	}
	default:
		return state
	}
}
