import * as action from '../constants/actionTypes'

export function startGame () {
	return {
		type: action.GAME_START,
		isRunning: true
	}
}

export function endGame () {
	return {
		type: action.GAME_END,
		isRunning: false
	}
}
