import { $$ } from '../utils/dom'
import store from '../store'
import changeRoute from '../actions/route'
import { startGame, endGame } from '../actions/game'
import { addTetromino, moveTetromino, rotateTetromino } from '../actions/tetromino'
import Tetromino from './tetromino'

const $buttons = [...$$('button')]

function onButtonAction (action) {
	switch (action) {
	case 'startGame':
		store.dispatch(addTetromino(new Tetromino()))
		store.dispatch(startGame())
		break
	case 'pauseGame':
		store.dispatch(endGame())
		break
	case 'moveTetrominoLeft':
		store.dispatch(moveTetromino('LEFT'))
		break
	case 'moveTetrominoRight':
		store.dispatch(moveTetromino('RIGHT'))
		break
	case 'rotateBlock':
		store.dispatch(rotateTetromino())
		break
	default:
		break
	}
}

function onClickButton ({ target }) {
	if (target.nodeName !== 'BUTTON') return
	const dataRoute = target.getAttribute('data-route')
	const dataAction = target.getAttribute('data-action')

	if (dataRoute) {
		store.dispatch(changeRoute(dataRoute))
	}

	if (dataAction) {
		onButtonAction(dataAction)
	}

	return target.blur()
}

function addEvents () {
	$buttons.forEach($btn => $btn.addEventListener('click', onClickButton))
}

export default { addEvents }
