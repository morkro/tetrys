import { $ } from '../../utils'

export default class ScoreBoard {
	constructor () {
		this.$board = $('.tetrys-scoreboard')
	}

	emptyBoard () {
		this.$board.innerHTML = ''
	}

	createListItem (txt) {
		const $li = document.createElement('li')
		const $span = document.createElement('span')
		$span.appendChild(document.createTextNode(txt))
		$li.appendChild($span)
		return $li
	}

	updateBoard (list = []) {
		const fragment = document.createDocumentFragment()
		list.forEach((score) => fragment.appendChild(this.createListItem(score)))
		this.emptyBoard()
		this.$board.appendChild(fragment)
	}
}
