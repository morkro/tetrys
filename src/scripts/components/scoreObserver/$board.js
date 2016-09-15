import { $ } from '../../utils'

export default class ScoreBoard {
	constructor () {
		this.$board = $('.tetrys-scoreboard')
		this.$items = [...this.$board.children]
	}

	updateBoard (list = []) {
		list.forEach((score, index) => {
			this.$items[index].children[0].innerText = score
		})
	}
}
