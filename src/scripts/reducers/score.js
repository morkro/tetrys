import {
	SCORE_CURRENT_UPDATE,
	SCORE_HIGHSCORE_SET,
	SCORE_ADD
} from '../constants/score'

const initialState = {
	current: 0,
	highscore: 0,
	all: []
}

export default function Score (state = initialState, action) {
	switch (action.type) {
	case SCORE_CURRENT_UPDATE:
		return Object.assign({}, state, {
			current: state.current + action.current
		})
	case SCORE_HIGHSCORE_SET:
		return Object.assign({}, state, {
			highscore: action.highscore
		})
	case SCORE_ADD:
		return Object.assign({}, state, {
			all: [...state.all, action.all]
		})
	default:
		return state
	}
}
