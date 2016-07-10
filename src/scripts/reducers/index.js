import { combineReducers } from 'redux'
import game from './game'
import activeBlock from './activeBlock'
import score from './score'

const tetrys = combineReducers({
	game,
	activeBlock,
	score
})

export default tetrys
