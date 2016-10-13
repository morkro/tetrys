import { $ } from '../../utils'

export default class ScoreBoard {
	constructor () {
		this.$board = $('.tetrys-scoreboard')
	}

	emptyBoard () {
		this.$board.innerHTML = ''
	}

	createListItem ([score, time] = []) {
		const $li = document.createElement('li')
		const $score = document.createElement('span')
		const $time = document.createElement('span')

		$score.appendChild(document.createTextNode(score))
		$time.appendChild(document.createTextNode(time))
		$li.appendChild($score)
		$li.appendChild($time)

		return $li
	}

	updateBoard (list = []) {
		const fragment = document.createDocumentFragment()
		list.forEach((score) => fragment.appendChild(this.createListItem(score)))
		this.emptyBoard()
		this.$board.appendChild(fragment)
	}
}
