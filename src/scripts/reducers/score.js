import { ADD_SCORE } from '../constants/actionTypes';

const initialState = {
	highscore: {},
	all: []
};

export default function Score (state = initialState, action) {
	switch (action.type) {
	case ADD_SCORE:
		return Object.assign({}, state, {
			all: [...state.all, action.score]
		});
	default:
		return state;
	}
}
