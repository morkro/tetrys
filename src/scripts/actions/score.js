import * as action from '../constants/actionTypes'

export function addScore (score) {
	return {
		type: action.SCORE_ADD,
		score
	}
}
