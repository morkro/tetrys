import * as action from '../constants/actionTypes'

export function setActiveBlock ({ identifier, shape }) {
	return {
		type: action.ACTIVE_BLOCK_SET,
		identifier,
		shape
	}
}

export function moveActiveBlock (direction) {
	return {
		type: action.ACTIVE_BLOCK_MOVE,
		direction
	}
}

export function rotateActiveBlock () {
	return {
		type: action.ACTIVE_BLOCK_ROTATE
	}
}
