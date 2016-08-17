import { GAME_START, GAME_PAUSED, GAME_END, GAME_LEVEL_UPDATE } from '../constants/game'

export function startGame () {
	return {
		type: GAME_START,
		isRunning: true
	}
}

export function pauseGame () {
	return {
		type: GAME_PAUSED,
		isRunning: false
	}
}

export function endGame () {
	return {
		type: GAME_END,
		isRunning: false
	}
}

export function updateGameLevel () {
	return {
		type: GAME_LEVEL_UPDATE
	}
}
