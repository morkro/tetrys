import * as type from '../constants/actionTypes'

const initialState = {
	isRunning: false
}

export default function Game (state = initialState, action) {
	switch (action.type) {
	case type.GAME_START:
	case type.GAME_END:
		return Object.assign({}, state, { isRunning: action.isRunning })
	default:
		return state
	}
}
