import * as type from '../constants/actionTypes';
import { BOARD_COLUMNS } from '../constants/game';

const initialState = {
	identifier: '',
	shape: [],
	column: Math.floor(BOARD_COLUMNS / 2),
	row: 0
};

export default function activeBlock (state = initialState, action) {
	const { identifier, shape } = action;

	switch (action.type) {
	case type.SET_ACTIVE_BLOCK:
		return Object.assign({}, state, { identifier, shape });
	case type.MOVE_ACTIVE_BLOCK: {
		let { column } = state;
		if (action.direction === 'LEFT') {
			column = state.column - 1;
		}
		else if (action.direction === 'RIGHT') {
			column = state.column + 1;
		}

		return Object.assign({}, state, { column });
	}
	default:
		return state;
	}
}
