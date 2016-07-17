import {
	GAME_START,
	GAME_END,
	GAME_LEVEL_UPDATE
} from '../constants/game'

export function startGame () {
	return {
		type: GAME_START,
		isRunning: true
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
