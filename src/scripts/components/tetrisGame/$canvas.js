import throttle from 'lodash/throttle'
import { $ } from '../../utils'

export default class Canvas {
	constructor ({ BOARD_COLUMNS, BOARD_ROWS } = {}) {
		this.$canvas = $('#game')
		this.$wrapper = this.$canvas.parentNode
		this.context = this.$canvas.getContext('2d')

		this.BOARD_COLUMNS = BOARD_COLUMNS
		this.BOARD_ROWS = BOARD_ROWS

		this.width = this.$wrapper.offsetWidth
		this.height = this.$wrapper.offsetHeight
		this.blockWidth = this.width / this.BOARD_COLUMNS
		this.blockHeight = this.height / this.BOARD_ROWS
	}

	setCanvasSize () {
		this.$canvas.width = this.width = this.$wrapper.offsetWidth
		this.$canvas.height = this.height = this.$wrapper.offsetHeight
		this.blockWidth = this.width / this.BOARD_COLUMNS
		this.blockHeight = this.height / this.BOARD_ROWS
	}

	clearBoard () {
		this.context.clearRect(0, 0, this.width, this.height)
	}

	setBlockStyle ({ fill, stroke = 'transparent' } = {}) {
		this.context.fillStyle = fill
		this.context.strokeStyle = stroke
	}

	drawSimpleBlock (x, y) {
		this.context.fillRect(
			this.blockWidth * x, this.blockHeight * y,
			this.blockWidth - 1, this.blockHeight - 1
		)
		this.context.strokeRect(
			this.blockWidth * x, this.blockHeight * y,
			this.blockWidth - 1, this.blockHeight - 1
		)
	}

	addEvents () {
		window.addEventListener('resize', throttle(this.setCanvasSize, 100).bind(this))
	}

	init () {
		this.addEvents()
		this.setCanvasSize()
	}
}
