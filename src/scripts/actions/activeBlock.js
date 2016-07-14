import * as action from '../constants/actionTypes'

/**
 * Returns the location and shape of a new active block.
 * @param {Object} config
 * @param {String} config.identifier - The ID of the shape, e.g. "L"
 * @param {Array} config.shape - Shape example can be found in constants/shape.js
 * @returns {Object}
 * @todo Rethink if `column` and `row` should be handled differently.
 * @example setActiveBlock(new Tetromino())
 * // {
 * //		type: 'ACTIVE_BLOCK_SET',
 * //		identifier: 'L',
 * //		shape: [...]
 * //		column: 5,
 * //		row: 0
 * // }
 */
export function setActiveBlock ({ identifier, shape, column }) {
	return {
		type: action.ACTIVE_BLOCK_SET,
		identifier,
		shape,
		column,
		row: 0
	}
}

/**
 * Returns an object with a direction keyword.
 * @param {String} direction - The direction, e.g. `'LEFT'` or `'RIGHT'`
 * @return {Object}
 * @example moveActiveBlock('DOWN')
 * // {
 * //		type: 'ACTIVE_BLOCK_MOVE',
 * //		direction: 'DOWN'
 * // }
 */
export function moveActiveBlock (direction) {
	return {
		type: action.ACTIVE_BLOCK_MOVE,
		direction
	}
}

/**
 * Returns a simple action object.
 * @return {Object}
 * @example rotateActiveBlock()
 * // {
 * //		type: 'ACTIVE_BLOCK_ROTATE'
 * // }
 */
export function rotateActiveBlock () {
	return {
		type: action.ACTIVE_BLOCK_ROTATE
	}
}
