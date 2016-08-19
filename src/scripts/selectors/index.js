// Game
export function isRunning (store) {
	return store.getState().game.isRunning
}

// Board
export function getGrid (store) {
	return store.getState().board
}

// Tetromino
export function getTetromino (store) {
	return store.getState().tetromino
}

// Score
export function getCurrentScore (store) {
	return store.getState().score.current
}
