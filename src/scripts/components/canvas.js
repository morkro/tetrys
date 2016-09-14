import throttle from 'lodash/throttle'
import { BOARD_COLUMNS, BOARD_ROWS } from '../constants/board'
import { $, validBoardBoundary } from '../utils'
import { getTetromino, getGrid, isRunning } from '../store'
import Tetromino from './tetromino'
import {
	startGame, endGame,
	addTetromino, moveTetromino,
	freezeBoard, removeLineFromBoard,
	updateCurrentScore, addScore, clearCurrentScore
} from '../actions'

export default class Canvas {
	constructor ({ store, selector } = {}) {
		this.store = store

		this.$canvas = $(selector)
		this.$wrapper = this.$canvas.parentNode
		this.context = this.$canvas.getContext('2d')

		this.width = this.$wrapper.offsetWidth
		this.height = this.$wrapper.offsetHeight

		this.blockWidth = this.width / BOARD_COLUMNS
		this.blockHeight = this.height / BOARD_ROWS

		this.animationFrame = null
		this.tetrominoPositionAnimation = null
		this.isRunningInternal = false
		this.initialSpeed = 500
	}

	setSize () {
		this.$canvas.width = this.width = this.$wrapper.offsetWidth
		this.$canvas.height = this.height = this.$wrapper.offsetHeight
		this.blockWidth = this.width / BOARD_COLUMNS
		this.blockHeight = this.height / BOARD_ROWS
	}

	toggleGameState () {
		if (isRunning(this.store) && !this.isRunningInternal) {
			this.isRunningInternal = true
			this.updateGame()
			this.loop()
		}

		else if (!isRunning(this.store) && this.isRunningInternal) {
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
		for (let y = 0, grid = getGrid(this.store); y < grid.length; ++y) {
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
		const block = getTetromino(this.store)
		for (let y = 0; y < block.shape.length; ++y) {
			for (let x = 0; x < block.shape.length; ++x) {
				if (block.shape[y][x]) {
					this.setBlockStyle({ fill: 'cornflowerblue' })
					this.drawSimpleBlock(block.column + x, block.row + y)
				}
			}
		}
	}

	updateGame () {
		this.tetrominoPositionAnimation = setInterval(() => {
			const tetromino = getTetromino(this.store)
			const validBoundary = validBoardBoundary({
				active: tetromino,
				grid: getGrid(this.store),
				offsetY: 1
			})

			if (!validBoundary) {
				this.store.dispatch(freezeBoard(tetromino))
				this.store.dispatch(removeLineFromBoard())
				this.store.dispatch(addTetromino(new Tetromino()))
				return
			}

			this.store.dispatch(moveTetromino('DOWN'))
			this.store.dispatch(updateCurrentScore(10))
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

	stop () {
		if (!isRunning(this.store)) {
			return
		}

		this.store.dispatch(endGame())
		this.store.dispatch(addScore())
		this.store.dispatch(clearCurrentScore())
	}

	start () {
		this.store.dispatch(addTetromino(new Tetromino()))
		this.store.dispatch(startGame())
	}

	addEvents () {
		window.addEventListener('resize', throttle(this.setSize, 100).bind(this))
	}

	init () {
		this.addEvents()
		this.setSize()
		this.drawBackground()
		this.store.subscribe(this.toggleGameState.bind(this))
	}
}
