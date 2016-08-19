import { $, $$ } from './dom'
import { loadState, saveState } from './localStorage'
import installServiceWorker from './serviceWorker'
import {
	getEmptyGrid,
	validBoardBoundary,
	rotate,
	freezeBoard,
	removeLineFromBoard
} from './board'

export {
	$,
	$$,
	getEmptyGrid,
	validBoardBoundary,
	rotate,
	freezeBoard,
	removeLineFromBoard,
	loadState,
	saveState,
	installServiceWorker
}
