import * as type from '../constants/actionTypes'

export function addScore (score) {
	return {
		type: type.SCORE_ADD,
		score
	}
}
