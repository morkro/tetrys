import ROUTE_CHANGE from '../constants/route'

const initialState = {
	route: 'menu'
}

export default function Route (state = initialState, action) {
	switch (action.type) {
	case ROUTE_CHANGE:
		return Object.assign({}, state, {
			route: action.route
		})
	default:
		return state
	}
}
