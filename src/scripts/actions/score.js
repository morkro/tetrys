import {
	SCORE_CURRENT_UPDATE,
	SCORE_CURRENT_CLEAR,
	SCORE_HIGHSCORE_SET,
	SCORE_ADD
} from '../constants/score'

export function updateCurrentScore (current) {
	return {
		type: SCORE_CURRENT_UPDATE,
		current
	}
}

export function clearCurrentScore () {
	return {
		type: SCORE_CURRENT_CLEAR
	}
}

export function addScore () {
	return {
		type: SCORE_ADD
	}
}
