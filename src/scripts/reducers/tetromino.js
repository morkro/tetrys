import {
	TETROMINO_ADD,
	TETROMINO_MOVE,
	TETROMINO_ROTATE
} from '../constants/tetromino'

const initialState = {
	identifier: '',
	shape: [],
	column: 0,
	row: 0
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
	case TETROMINO_MOVE:
		switch (action.direction) {
		case 'LEFT':
			return Object.assign({}, state, { column: --state.column })
		case 'RIGHT':
			return Object.assign({}, state, { column: ++state.column })
		case 'DOWN':
			return Object.assign({}, state, { row: ++state.row })
		default:
			return state
		}
	case TETROMINO_ROTATE:
		return Object.assign({}, state, { shape: action.shape })
	default:
		return state
	}
}
