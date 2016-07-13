import * as type from '../constants/ActionTypes'

export function addScore (score) {
	return {
		type: type.SCORE_ADD,
		score
	}
}
