import * as type from '../constants/actionTypes';

const initialState = {
	identifier: '',
	shape: [],
	column: 3,
	row: 0
};

export default function activeBlock (state = initialState, action) {
	const { identifier, shape, column, row } = action;

	switch (action.type) {
	case type.SET_ACTIVE_BLOCK:
		return Object.assign({}, state, { identifier, shape });
	case type.UPDATE_ACTIVE_BLOCK:
		return Object.assign({}, state, { column, row });
	default:
		return state;
	}
}
