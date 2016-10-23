import throttle from 'lodash/throttle'
import { $ } from '../../utils'

/**
 * @class Canvas
 */
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

		this.colors = {
			background: '#5fe2ae',
			highlight: '#474283'
		}
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

	drawBackground (grid) {
		for (let y = 0; y < grid.length; ++y) {
			for (let x = 0; x < grid[y].length; ++x) {
				if (grid[y][x] === 1) {
					this.setBlockStyle({ fill: this.colors.highlight })
				}
				else {
					this.setBlockStyle({ fill: this.colors.background })
				}
				this.drawSimpleBlock(x, y)
			}
		}
	}

	drawTetromino (block) {
		for (let y = 0; y < block.shape.length; ++y) {
			for (let x = 0; x < block.shape.length; ++x) {
				if (block.shape[y][x]) {
					this.setBlockStyle({ fill: this.colors.highlight })
					this.drawSimpleBlock(block.column + x, block.row + y)
				}
			}
		}
	}

	addEvents () {
		window.addEventListener('resize', throttle(this.setCanvasSize, 100).bind(this))
	}

	init ({ grid }) {
		this.addEvents()
		this.setCanvasSize()
		this.drawBackground(grid)
	}
}
