import { combineReducers } from 'redux'
import game from './Game'
import activeBlock from './ActiveBlock'
import score from './Score'

const tetrys = combineReducers({
	game,
	activeBlock,
	score
})

export default tetrys
