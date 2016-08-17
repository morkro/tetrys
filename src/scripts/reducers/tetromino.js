import { TETROMINO_ADD, TETROMINO_MOVE, TETROMINO_ROTATE } from '../constants/tetromino'
import { validBoardBoundary } from '../utils/board'

const initialState = {
	identifier: '',
	shape: [],
	column: 0,
	row: 0
}

function rotateTetromino (current) {
	const newCurrent = []
	for (let y = 0; y < current.length; ++y) {
		newCurrent[y] = []
		for (let x = 0; x < current.length; ++x) {
			newCurrent[y][x] = current[(current.length - 1) - x][y]
		}
	}
	return newCurrent
}

export default function Tetromino (state = initialState, action) {
	switch (action.type) {
	case TETROMINO_ADD:
		return Object.assign({}, state, {
			identifier: action.identifier,
			shape: action.shape,
			column: action.column,
			row: action.row
		})
	case TETROMINO_MOVE: {
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
	case TETROMINO_ROTATE: {
		const tetromino = rotateTetromino(state.shape)
		if (validBoardBoundary({ tetromino })) {
			return Object.assign({}, state, { shape: tetromino })
		}
		return state
	}
	default:
		return state
	}
}
