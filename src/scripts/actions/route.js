import ROUTE_CHANGE from '../constants/route'

export default function changeRoute (route) {
	return {
		type: ROUTE_CHANGE,
		route
	}
}
