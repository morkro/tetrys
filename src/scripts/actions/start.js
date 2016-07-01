export const GAME_START = 'GAME_START';

export function startGame (text) {
	return { type: GAME_START, text };
}
