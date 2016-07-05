import { ADD_SCORE } from '../constants/actionTypes';

const initialState = {
	highscore: {},
	all: []
};

export default function score (state = initialState, action) {
	switch (action.type) {
	case ADD_SCORE:
		return Object.assign({}, state, {
			all: [...state.all, action.score]
		});
	default:
		return state;
	}
}
