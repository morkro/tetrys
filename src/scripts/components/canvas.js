import Stats from 'stats.js'
import throttle from 'lodash/throttle'
import { $ } from '../utils/dom'
import { validBoardBoundary } from '../utils/board'
import store from '../store'
import * as _ from '../selectors'
import { setActiveBlock, moveActiveBlock } from '../actions/activeBlock'
import { freezeBoard, removeLineFromBoard } from '../actions/board'
import { updateCurrentScore } from '../actions/score'
import Tetromino from '../components/tetromino'

const { NODE_ENV } = process.env

export default class Canvas {
	constructor (canvas) {
		this.canvas = $(canvas)
		this.context = this.canvas.getContext('2d')
		this.wrapper = this.canvas.parentNode
		this.width = this.wrapper.offsetWidth
		this.height = this.wrapper.offsetHeight
		this.blockWidth = this.width / _.getBoardColumns()
		this.blockHeight = this.height / _.getBoardRows()
		this.animationFrame = null
		this.activeBlockPositionAnimation = null
		this.isRunningInternal = false
		this.initialSpeed = 500

		if (NODE_ENV === 'development') {
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
		this.blockWidth = this.width / _.getBoardColumns()
		this.blockHeight = this.height / _.getBoardRows()
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
		for (let y = 0, grid = _.getGrid(); y < grid.length; ++y) {
			for (let x = 0; x < grid[y].length; ++x) {
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
		for (let y = 0; y < block.shape.length; ++y) {
			for (let x = 0; x < block.shape.length; ++x) {
				if (block.shape[y][x]) {
					this.setBlockStyle({ fill: 'cornflowerblue' })
					this.drawSimpleBlock(block.column + x, block.row + y)
				}
			}
		}
	}

	updateActiveBlockPosition () {
		this.activeBlockPositionAnimation = setInterval(() => {
			if (validBoardBoundary({ offsetY: 1 })) {
				store.dispatch(moveActiveBlock('DOWN'))
				store.dispatch(updateCurrentScore(10))
			}
			else {
				store.dispatch(freezeBoard(_.getActiveBlock().shape))
				store.dispatch(removeLineFromBoard())
				store.dispatch(setActiveBlock(new Tetromino()))
			}
		}, this.initialSpeed)
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

	addEvents () {
		window.addEventListener('resize', throttle(this.setSize, 100).bind(this))
	}

	init () {
		if (NODE_ENV === 'development') {
			this.appendStats()
		}

		this.addEvents()
		this.setSize()
		this.drawBackground()

		store.subscribe(this.toggleGameState.bind(this))
	}
}
