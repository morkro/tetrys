import {
	ACTIVE_BLOCK_SET,
	ACTIVE_BLOCK_MOVE,
	ACTIVE_BLOCK_ROTATE
} from '../constants/activeBlock'

export function setActiveBlock ({ identifier, shape, column }) {
	return {
		type: ACTIVE_BLOCK_SET,
		identifier,
		shape,
		column,
		row: 0
	}
}

export function moveActiveBlock (direction) {
	return {
		type: ACTIVE_BLOCK_MOVE,
		direction
	}
}

export function rotateActiveBlock () {
	return {
		type: ACTIVE_BLOCK_ROTATE
	}
}
