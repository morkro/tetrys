import { BOARD_FREEZE, BOARD_LINE_REMOVE } from '../constants/board'

export function freezeBoard (tetromino) {
	return {
		type: BOARD_FREEZE,
		tetromino
	}
}

export function removeLineFromBoard () {
	return {
		type: BOARD_LINE_REMOVE
	}
}
