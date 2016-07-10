import Stats from 'stats.js'
import { $ } from '../helpers/dom'
import store from '../store'
import * as _ from '../store/connect'
import Tetromino from '../components/tetromino'
import { setActiveBlock, moveActiveBlock } from '../actions/activeBlock'

export default class Canvas {
	constructor (canvas) {
		this.canvas = $(canvas)
		this.context = this.canvas.getContext('2d')
		this.wrapper = this.canvas.parentNode
		this.width = this.wrapper.offsetWidth
		this.height = this.wrapper.offsetHeight
		this.blockWidth = this.width / _.getColumnsSize()
		this.blockHeight = this.height / _.getRowSize()
		this.animationFrame = null
		this.activeBlockPositionAnimation = null
		this.isRunningInternal = false

		if (process.env.NODE_ENV === 'development') {
			this.stats = new Stats()
		}
	}

	appendStats () {
		this.stats.showPanel(0)
		document.body.appendChild(this.stats.dom)
	}

	setSize () {
		this.canvas.width = this.width = this.wrapper.offsetWidth
		this.canvas.height = this.height = this.wrapper.offsetHeight
		this.blockWidth = this.width / _.getColumnsSize()
		this.blockHeight = this.height / _.getRowSize()
	}

	toggleGameState () {
		if (_.isRunning() && !this.isRunningInternal) {
			this.isRunningInternal = true
			this.updateActiveBlockPosition()
			this.loop()
		}

		else if (!_.isRunning() && this.isRunningInternal) {
			this.isRunningInternal = false
			this.cancelActiveBlockPosition()
			this.cancelLoop()
		}
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

	drawBackground () {
		for (let y = 0, grid = _.getGrid(); y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				if (grid[y][x] === 1) {
					this.setBlockStyle({ fill: 'mediumseagreen' })
				}
				else {
					this.setBlockStyle({ fill: 'white' })
				}
				this.drawSimpleBlock(x, y)
			}
		}
	}

	drawActiveBlock () {
		const block = _.getActiveBlock()
		for (let y = 0; y < block.shape.length; y++) {
			for (let x = 0; x < block.shape[y].length; x++) {
				if (block.shape[y][x]) {
					this.setBlockStyle({ fill: 'red' })
					this.drawSimpleBlock(block.column + x - 1, block.row + y - 1)
				}
			}
		}
	}

	updateActiveBlockPosition () {
		this.activeBlockPositionAnimation = setInterval(() => {
			store.dispatch(moveActiveBlock('DOWN'))
		}, 2000)
	}

	cancelActiveBlockPosition () {
		clearInterval(this.activeBlockPositionAnimation)
	}

	loop () {
		this.animationFrame = requestAnimationFrame(this.loop.bind(this))

		if (process.env.NODE_ENV === 'development') {
			this.stats.begin()
		}

		this.clearBoard()
		this.setBlockStyle({ fill: 'white' })
		this.drawBackground()
		this.drawActiveBlock()

		if (process.env.NODE_ENV === 'development') {
			this.stats.end()
		}
	}

	cancelLoop () {
		cancelAnimationFrame(this.animationFrame)
	}

	init () {
		if (process.env.NODE_ENV === 'development') {
			this.appendStats()
		}

		this.setSize()
		this.drawBackground()

		store.dispatch(setActiveBlock(new Tetromino()))
		store.subscribe(this.toggleGameState.bind(this))
	}
}
