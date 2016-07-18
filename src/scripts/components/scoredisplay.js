import { $ } from '../utils/dom'
import store from '../store'
import { isRunning, getCurrentScore } from '../selectors'

export default class ScoreDisplay {
	constructor (element) {
		this.element = $(element)
		this.scoreCount = this.element.querySelector('span')
	}

	updateScoreCount () {
		const count = parseInt(this.scoreCount.innerText, 10)
		const currentScore = getCurrentScore()

		if (isRunning() && count !== currentScore) {
			this.scoreCount.innerText = currentScore
		}
	}

	init () {
		store.subscribe(this.updateScoreCount.bind(this))
	}
}
