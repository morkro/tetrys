import * as type from '../constants/ActionTypes'
import { BOARD_COLUMNS } from '../constants/Game'
import * as _ from '../selectors'

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

function validBoundaries (
	offsetX = 0,
	offsetY = 0,
	tetromino = _.getActiveBlock()
) {
	const newOffsetX = tetromino.column + offsetX
	const newOffsetY = tetromino.row + offsetY

	for (let y = 0; y < tetromino.shape.length; y++) {
		for (let x = 0; x < tetromino.shape.length; x++) {
			if (
				tetromino.shape[y][x] && // shape is present
				_.getGrid()[y + newOffsetY][x + newOffsetX] || // wall has blocks
				x + newOffsetX < 0 || // hitting left wall
				x + newOffsetX >= _.getGameColumns() ||
				y + newOffsetY >= _.getGameRows()
			) {
				return false
			}
		}
	}

	return true
}

export default function activeBlock (state = initialState, action) {
	switch (action.type) {
	case type.ACTIVE_BLOCK_SET:
		return Object.assign({}, state, {
			identifier: action.identifier,
			shape: action.shape
		})
	case type.ACTIVE_BLOCK_MOVE: {
		switch (action.direction) {
		case 'LEFT':
			if (validBoundaries(-1)) {
				return Object.assign({}, state, { column: state.column - 1 })
			}
			return state
		case 'RIGHT':
			if (validBoundaries(1)) {
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
	case type.ACTIVE_BLOCK_ROTATE:
		return Object.assign({}, state, {
			shape: rotateBlock(state.shape)
		})
	default:
		return state
	}
}
