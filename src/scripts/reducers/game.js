import {
	GAME_START,
	GAME_END,
	GAME_LEVEL_UPDATE
} from '../constants/game'

const initialState = {
	isRunning: false,
	level: 1
}

export default function Game (state = initialState, action) {
	switch (action.type) {
	case GAME_START:
	case GAME_END:
		return Object.assign({}, state, {
			isRunning: action.isRunning
		})
	case GAME_LEVEL_UPDATE:
		return Object.assign({}, state, {
			level: ++state.level
		})
	default:
		return state
	}
}
