import { $, $$ } from '../utils/dom'
import store from '../store'
import { isRunning } from '../selectors'
import Tetromino from '../components/tetromino'
import { startGame, endGame } from '../actions/game'
import { setActiveBlock, moveActiveBlock } from '../actions/activeBlock'

const $menus = [...$$('.tetrys-controls')]
const $views = [...$$('.tetrys-view')]
const $menuView = $('.tetrys-view.view-menu')
const $gameView = $('.tetrys-view.view-game')
const $scoreView = $('.tetrys-view.view-scoreboard')

function showView (view) {
	$views.forEach(section => {
		if (section === view) {
			section.classList.remove('is-hidden')
			return
		}
		section.classList.add('is-hidden')
	})
}

function onStartGame () {
	showView($gameView)
	store.dispatch(startGame())
	store.dispatch(setActiveBlock(new Tetromino()))
}

function onButtonScoreboard () {
	showView($scoreView)
	if (isRunning()) {
		store.dispatch(endGame())
	}
}

function onButtonBack () {
	showView($menuView)
}

function onClickMenu ({ target }) {
	if (target.nodeName !== 'BUTTON') {
		return
	}

	const attr = target.getAttribute('data-action')
	target.blur()

	switch (attr) {
	case 'startGame':
		return onStartGame()
	case 'endGame':
		return store.dispatch(endGame())
	case 'moveLeft':
	case 'moveRight':
		return store.dispatch(moveActiveBlock(attr.toUpperCase()))
	case 'openScoreBoard':
		return onButtonScoreboard()
	case 'openMenu':
		return onButtonBack()
	default:
		return
	}
}

function addEvents () {
	$menus.forEach($menu => $menu.addEventListener('click', onClickMenu))
}

export default { addEvents }
