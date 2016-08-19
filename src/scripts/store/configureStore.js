import { createStore } from 'redux'
import reducers from '../reducers'
import { loadState } from '../utils'

const { devToolsExtension } = window

export default function configureStore (persistedState = loadState()) {
	return createStore(
		reducers,
		persistedState,
		devToolsExtension && devToolsExtension()
	)
}
