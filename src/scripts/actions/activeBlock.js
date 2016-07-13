import * as type from '../constants/ActionTypes'

export function setActiveBlock ({ identifier, shape }) {
	return {
		type: type.ACTIVE_BLOCK_SET,
		identifier,
		shape
	}
}

export function moveActiveBlock (direction) {
	return {
		type: type.ACTIVE_BLOCK_MOVE,
		direction
	}
}

export function rotateActiveBlock () {
	return {
		type: type.ACTIVE_BLOCK_ROTATE
	}
}
