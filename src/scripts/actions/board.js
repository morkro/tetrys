import { BOARD_FREEZE, BOARD_LINE_REMOVE } from '../constants/board'

export function freezeBoard (shape) {
	return {
		type: BOARD_FREEZE,
		shape
	}
}

export function removeLineFromBoard () {
	return {
		type: BOARD_LINE_REMOVE
	}
}
