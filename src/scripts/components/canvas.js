import throttle from 'lodash/throttle'
import { $, validBoardBoundary } from '../utils'
import { addTetromino, moveTetromino } from '../actions/tetromino'
import { freezeBoard, removeLineFromBoard } from '../actions/board'
import { updateCurrentScore } from '../actions/score'
import store from '../store'
import { getTetromino, getBoardRows, getBoardColumns, getGrid, isRunning } from '../selectors'
import Tetromino from '../components/tetromino'

export class Canvas {
	constructor (canvas) {
		this.canvas = $(canvas)
		this.context = this.canvas.getContext('2d')
		this.wrapper = this.canvas.parentNode
		this.width = this.wrapper.offsetWidth
		this.height = this.wrapper.offsetHeight
		this.blockWidth = this.width / getBoardColumns()
		this.blockHeight = this.height / getBoardRows()
		this.animationFrame = null
		this.tetrominoPositionAnimation = null
		this.isRunningInternal = false
		this.initialSpeed = 500
	}

	setSize () {
		this.canvas.width = this.width = this.wrapper.offsetWidth
		this.canvas.height = this.height = this.wrapper.offsetHeight
		this.blockWidth = this.width / getBoardColumns()
		this.blockHeight = this.height / getBoardRows()
	}

	toggleGameState () {
		if (isRunning() && !this.isRunningInternal) {
			this.isRunningInternal = true
			this.updateTetrominoPosition()
			this.loop()
		}

		else if (!isRunning() && this.isRunningInternal) {
			this.isRunningInternal = false
			this.cancelTetrominoPosition()
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
		for (let y = 0, grid = getGrid(); y < grid.length; ++y) {
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

	drawTetromino () {
		const block = getTetromino()
		for (let y = 0; y < block.shape.length; ++y) {
			for (let x = 0; x < block.shape.length; ++x) {
				if (block.shape[y][x]) {
					this.setBlockStyle({ fill: 'cornflowerblue' })
					this.drawSimpleBlock(block.column + x, block.row + y)
				}
			}
		}
	}

	updateTetrominoPosition () {
		this.tetrominoPositionAnimation = setInterval(() => {
			if (validBoardBoundary({ offsetY: 1 })) {
				store.dispatch(moveTetromino('DOWN'))
				store.dispatch(updateCurrentScore(10))
			}
			else {
				store.dispatch(freezeBoard(getTetromino().shape))
				store.dispatch(removeLineFromBoard())
				store.dispatch(addTetromino(new Tetromino()))
			}
		}, this.initialSpeed)
	}

	cancelTetrominoPosition () {
		clearInterval(this.tetrominoPositionAnimation)
	}

	loop () {
		this.animationFrame = requestAnimationFrame(this.loop.bind(this))

		this.clearBoard()
		this.setBlockStyle({ fill: 'white' })
		this.drawBackground()
		this.drawTetromino()
	}

	cancelLoop () {
		cancelAnimationFrame(this.animationFrame)
	}

	addEvents () {
		window.addEventListener('resize', throttle(this.setSize, 100).bind(this))
	}

	init () {
		this.addEvents()
		this.setSize()
		this.drawBackground()
		store.subscribe(this.toggleGameState.bind(this))
	}
}

export default function createCanvas (selector) {
	const canvas = new Canvas(selector)
	return canvas.init()
}
