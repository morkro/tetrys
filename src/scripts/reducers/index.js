import { combineReducers } from 'redux'
import game from './game'
import board from './board'
import activeBlock from './activeBlock'
import score from './score'

const tetrys = combineReducers({
	score,
	game,
	board,
	activeBlock
})

export default tetrys
