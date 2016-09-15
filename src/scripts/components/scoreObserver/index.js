import { isRunning, getScoreList, getCurrentScore } from '../../store'
import ScoreBoard from './$board'
import ScoreLabel from './$label'

export default class ScoreObserver {
	constructor (store) {
		this.store = store
		this.$board = new ScoreBoard()
		this.$label = new ScoreLabel()
	}

	updateScore () {
		if (!isRunning(this.store)) {
			return
		}

		this.$label.updateLabel(getCurrentScore(this.store))
	}

	updateScoreBoard () {
		this.$board.updateBoard(getScoreList(this.store))
	}

	init () {
		this.store.subscribe(this.updateScore.bind(this))
	}
}
