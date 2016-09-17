import Canvas from './$canvas'
import { BOARD_COLUMNS, BOARD_ROWS } from '../../constants/board'
import { validBoardBoundary } from '../../utils'
import { getTetromino, getGrid, isRunning } from '../../store'
import Tetromino from '../tetromino'
import {
	startGame, endGame,
	addTetromino, moveTetromino,
	freezeBoard, removeLineFromBoard,
	updateCurrentScore, addScore, clearCurrentScore
} from '../../actions'

export default class TetrisGame {
	constructor (store) {
		this.store = store
		this.$canvas = new Canvas({ BOARD_COLUMNS, BOARD_ROWS })

		this.animationFrame = null
		this.tetrominoPositionAnimation = null
		this.isRunningInternal = false
		this.initialSpeed = 500
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

	drawBackground () {
		for (let y = 0, grid = getGrid(this.store); y < grid.length; ++y) {
			for (let x = 0; x < grid[y].length; ++x) {
				if (grid[y][x] === 1) {
					this.$canvas.setBlockStyle({ fill: 'mediumseagreen' })
				}
				else {
					this.$canvas.setBlockStyle({ fill: 'white' })
				}
				this.$canvas.drawSimpleBlock(x, y)
			}
		}
	}

	drawTetromino () {
		const block = getTetromino(this.store)
		for (let y = 0; y < block.shape.length; ++y) {
			for (let x = 0; x < block.shape.length; ++x) {
				if (block.shape[y][x]) {
					this.$canvas.setBlockStyle({ fill: 'cornflowerblue' })
					this.$canvas.drawSimpleBlock(block.column + x, block.row + y)
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

		this.$canvas.clearBoard()
		this.$canvas.setBlockStyle({ fill: 'white' })
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

	init () {
		this.$canvas.init()
		this.drawBackground()
		this.store.subscribe(this.toggleGameState.bind(this))
	}
}
