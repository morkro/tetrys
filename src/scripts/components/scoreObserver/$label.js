import { $ } from '../../utils'

/**
 * @class ScoreLabel
 */
export default class ScoreLabel {
	constructor () {
		this.$label = $('.game-current-score')
		this.$labelCount = this.$label.querySelector('span')
		this.initScore = 0
	}

	updateLabel (score = this.initScore) {
		this.$labelCount.innerText = score
	}
}
