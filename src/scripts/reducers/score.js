import { SCORE_ADD } from '../constants/actionTypes'

const initialState = {
	highscore: {},
	all: []
}

export default function Score (state = initialState, action) {
	switch (action.type) {
	case SCORE_ADD:
		return Object.assign({}, state, {
			all: [...state.all, action.score]
		})
	default:
		return state
	}
}
