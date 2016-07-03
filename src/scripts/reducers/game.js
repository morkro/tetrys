import { START_GAME, END_GAME } from '../constants/actionTypes';

const initialState = {
	isRunning: false
};

export default function Game (state = initialState, action) {
	switch (action.type) {
	case START_GAME:
	case END_GAME:
		return Object.assign({}, state, { isRunning: action.isRunning });
	default:
		return state;
	}
}
