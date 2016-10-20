import { isRunning, getScoreList, getCurrentScore } from '../../store'
import ScoreBoard from './$board'
import ScoreLabel from './$label'

export default class ScoreObserver {
	constructor (store) {
		this.store = store
		this.$board = new ScoreBoard()
		this.$label = new ScoreLabel()
	}

	getFormattedList (list = []) {
		return list.map(([score, date]) => [score, this.formatDate(date)])
	}

	formatDate (ms) {
		const date = new Date(ms)
		return `${date.getUTCDate()}.${date.getUTCMonth()}.${date.getUTCFullYear()}`
	}

	updateScore () {
		if (!isRunning(this.store)) {
			return
		}

		this.$label.updateLabel(getCurrentScore(this.store))
	}

	updateScoreBoard () {
		this.$board.updateBoard(this.getFormattedList(getScoreList(this.store)))
	}

	init () {
		this.store.subscribe(this.updateScore.bind(this))
	}
}
