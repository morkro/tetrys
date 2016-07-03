import store from './';

console.log(store);

export function isRunning () {
	return store.getState().Game.isRunning;
}

export function getHighScore () {
	return store.getState().Score.highscore;
}
