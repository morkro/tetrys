import {
	SCORE_CURRENT_UPDATE,
	SCORE_CURRENT_CLEAR,
	SCORE_ADD
} from '../constants/score'
import { updateScoreList } from '../utils'

const initialState = {
	current: 0,
	all: []
}

export default function Score (state = initialState, action) {
	switch (action.type) {
	case SCORE_CURRENT_UPDATE:
		return Object.assign({}, state, {
			current: state.current + action.current
		})
	case SCORE_CURRENT_CLEAR:
		return Object.assign({}, state, {
			current: 0
		})
	case SCORE_ADD:
		return Object.assign({}, state, {
			all: updateScoreList(state.current, state.all)
		})
	default:
		return state
	}
}
