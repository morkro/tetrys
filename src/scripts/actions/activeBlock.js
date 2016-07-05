import * as type from '../constants/actionTypes';

export function setActiveBlock ({ identifier, shape }) {
	return {
		type: type.SET_ACTIVE_BLOCK,
		identifier,
		shape
	};
}

export function moveActiveBlock (direction) {
	return {
		type: type.MOVE_ACTIVE_BLOCK,
		direction
	};
}
