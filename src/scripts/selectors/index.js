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

// Tetromino
export function getTetromino () {
	return store.getState().tetromino
}

// Score
export function getCurrentScore () {
	return store.getState().score.current
}

// Route
export function getRoute () {
	return store.getState().route.route
}
