import { combineReducers } from 'redux'
import game from './game'
import board from './board'
import tetromino from './tetromino'
import score from './score'

export default combineReducers({
	score,
	game,
	board,
	tetromino
})
