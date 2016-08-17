import { SCORE_CURRENT_UPDATE, SCORE_HIGHSCORE_SET, SCORE_ADD } from '../constants/score'

export function updateCurrentScore (current) {
	return {
		type: SCORE_CURRENT_UPDATE,
		current
	}
}

export function setHighscore (highscore) {
	return {
		type: SCORE_HIGHSCORE_SET,
		highscore
	}
}

export function addScore (score) {
	return {
		type: SCORE_ADD,
		score
	}
}
