import store from '../store'

export function getGameColumns () {
	return store.getState().game.columns
}

export function getGameRows () {
	return store.getState().game.rows
}

export function isRunning () {
	return store.getState().game.isRunning
}

export function getGrid () {
	return store.getState().game.grid
}

export function getActiveBlock () {
	return store.getState().activeBlock
}
