import store from './'

export function isRunning () {
	return store.getState().game.isRunning
}

export function getColumnsSize () {
	return store.getState().game.columns
}

export function getRowSize () {
	return store.getState().game.rows
}

export function getGrid () {
	return store.getState().game.grid
}

export function getActiveBlock () {
	return store.getState().activeBlock
}
