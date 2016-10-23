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

/**
 * @class TetrisGame
 */
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
		this.$canvas.drawBackground(getGrid(this.store))
		this.$canvas.drawTetromino(getTetromino(this.store))
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
		this.$canvas.init({ grid: getGrid(this.store) })
		this.store.subscribe(this.toggleGameState.bind(this))
	}
}
