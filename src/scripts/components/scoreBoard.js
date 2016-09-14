import { $ } from '../utils'
import { getScoreList } from '../store'

export default class ScoreBoard {
	constructor ({ selector, store }) {
		this.store = store
		this.$board = $(selector)
		this.$boardItems = [...this.$board.children]
	}

	update () {
		getScoreList(this.store).forEach((score, index) => {
			this.$boardItems[index].children[0].innerText = score
		})
	}

	init () {
		this.update()
	}
}
