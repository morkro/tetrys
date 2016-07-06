import * as type from '../constants/actionTypes'

export function startGame () {
	return {
		type: type.START_GAME,
		isRunning: true
	}
}

export function endGame () {
	return {
		type: type.END_GAME,
		isRunning: false
	}
}
