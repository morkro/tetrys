import { SCORE_LIST_LENGTH } from '../constants/score'

export default function updateScoreList (score = [0, 0], list = []) {
	list.push(score)
	return list
		.sort((x, y) => x[0] - y[0])
		.reverse()
		.slice(0, SCORE_LIST_LENGTH)
}
