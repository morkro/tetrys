import { $$ } from '../utils/dom'
import store from '../store'
import { isRunning } from '../selectors'
import Tetromino from '../components/tetromino'
import { startGame, endGame } from '../actions/game'
import {
	setActiveBlock,
	moveActiveBlock,
	rotateActiveBlock
} from '../actions/activeBlock'

const $menus = [...$$('.tetrys-controls')]
const $views = [...$$('.tetrys-view')]
const $menuView = $views.find($v => $v.classList.contains('view-menu'))
const $gameView = $views.find($v => $v.classList.contains('view-game'))
const $scoreView = $views.find($v => $v.classList.contains('view-scoreboard'))
const $aboutView = $views.find($v => $v.classList.contains('view-about'))

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
	if (isRunning()) {
		store.dispatch(endGame())
	}
}

function onButtonAbout () {
	showView($aboutView)
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
	case 'moveBlockLeft':
		return store.dispatch(moveActiveBlock('LEFT'))
	case 'moveBlockRight':
		return store.dispatch(moveActiveBlock('RIGHT'))
	case 'rotateBlock':
		return store.dispatch(rotateActiveBlock())
	case 'openScoreBoard':
		return onButtonScoreboard()
	case 'openMenu':
		return onButtonBack()
	case 'openAbout':
		return onButtonAbout()
	default:
		return
	}
}

function addEvents () {
	$menus.forEach($menu => $menu.addEventListener('click', onClickMenu))
}

export default { addEvents }
