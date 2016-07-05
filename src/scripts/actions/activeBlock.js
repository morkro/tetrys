import * as type from '../constants/actionTypes';

export function setActiveBlock (identifier, shape) {
	return {
		type: type.SET_ACTIVE_BLOCK,
		identifier,
		shape
	};
}

export function updateActiveBlock (column, row) {
	return {
		type: type.UPDATE_ACTIVE_BLOCK,
		column,
		row
	};
}
