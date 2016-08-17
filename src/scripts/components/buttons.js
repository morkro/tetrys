import { $$ } from '../utils/dom'
import store from '../store'
import { startGame, endGame } from '../actions/game'
import { addTetromino, moveTetromino, rotateTetromino } from '../actions/tetromino'
import Tetromino from './tetromino'
import updateView from './presentational/views'

const $buttons = [...$$('button')]

/**
 * Evaluates the `action` parameter and dispatches appropiate action.
 * @param {String} action
 * @return {undefined|ReduxStore} [description]
 */
function dispatchAction (action) {
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

/**
 * Event handler that depending on the `data-` attributes of an element either updates
 * the view or store.dispatches actions.
 * @param {HTMLElement} target
 * @return {undefined}
 */
function onClickButton ({ target }) {
	if (target.nodeName !== 'BUTTON') return

	const dataRoute = target.getAttribute('data-route')
	const dataAction = target.getAttribute('data-action')

	if (dataRoute) updateView(dataRoute)
	if (dataAction) dispatchAction(dataAction)

	target.blur()
}

/**
 * Adds event listener to buttons.
 * @return {undefined}
 */
export default function addButtonEvents () {
	return $buttons.forEach($btn => $btn.addEventListener('click', onClickButton))
}
