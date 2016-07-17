import store from '../store'

// Game
export function isRunning () {
	return store.getState().game.isRunning
}

// Board
export function getBoardColumns () {
	return store.getState().board.columns
}
export function getBoardRows () {
	return store.getState().board.rows
}
export function getGrid () {
	return store.getState().board.grid
}

// Active block
export function getActiveBlock () {
	return store.getState().activeBlock
}

// Score
export function getCurrentScore () {
	return store.getState().score.current
}
