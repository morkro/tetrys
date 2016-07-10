import { BOARD_COLUMNS, BOARD_ROWS } from '../constants/game'

export function getEmptyGrid () {
	const grid = []

	for (let i = 0; i < BOARD_ROWS; i++) {
		grid[i] = []
		for (let j = 0; j < BOARD_COLUMNS; j++) {
			grid[i].push(0)
		}
	}

	return grid
}

export function throttleAnimationFrames (cb = () => {}, throttle = 0) {
	let counter = 0
	let animationFrame = null

	function loop () {
		if (counter < throttle) {
			counter++
			animationFrame = window.requestAnimationFrame(loop)
			return
		}

		cb()
		counter = 0
		animationFrame = window.requestAnimationFrame(loop)
	}

	loop()
	return animationFrame
}
