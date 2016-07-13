import * as action from '../constants/actionTypes'

export function freezeBoard ({ shape }) {
	return {
		type: action.BOARD_FREEZE,
		shape
	}
}

export function removeLineFromBoard () {
	return {
		type: action.BOARD_LINE_REMOVE
	}
}
