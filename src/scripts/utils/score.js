import { SCORE_LIST_LENGTH } from '../constants/score'

export default function updateScoreList (score = 0, list = []) {
	return list
		.concat(score)
		.sort((x, y) => x - y)
		.reverse()
		.slice(0, SCORE_LIST_LENGTH)
}
