import { combineReducers } from 'redux'
import game from './game'
import board from './board'
import tetromino from './tetromino'
import score from './score'
import route from './route'

export default combineReducers({
	score,
	game,
	board,
	tetromino,
	route
})
