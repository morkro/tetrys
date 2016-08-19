import { BOARD_FREEZE, BOARD_LINE_REMOVE } from '../constants/board'
import { getEmptyGrid, freezeBoard, removeLineFromBoard } from '../utils/board'

const initialState = getEmptyGrid()

export default function Board (state = initialState, action) {
	switch (action.type) {
	case BOARD_FREEZE:
		return freezeBoard({ tetromino: action.tetromino, board: state })
	case BOARD_LINE_REMOVE:
		return removeLineFromBoard(state)
	default:
		return state
	}
}
