import * as type from '../constants/actionTypes'

export function startGame () {
	return {
		type: type.GAME_START,
		isRunning: true
	}
}

export function endGame () {
	return {
		type: type.GAME_END,
		isRunning: false
	}
}
