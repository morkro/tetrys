import * as _ from '../../selectors'

export default function validBoundaries (
	offsetX = 0,
	offsetY = 0,
	tetromino = []
) {
	const activeBlock = _.getActiveBlock()
	const newOffsetX = activeBlock.column + offsetX
	const newOffsetY = activeBlock.row + offsetY
	let shape = tetromino

	if (shape.length === 0) {
		shape = activeBlock.shape
	}

	for (let y = 0; y < shape.length; y++) {
		for (let x = 0; x < shape.length; x++) {
			if (
				shape[y][x] && // shape is present
				_.getGrid()[y + newOffsetY][x + newOffsetX] || // wall has blocks
				x + newOffsetX < 0 || // hitting left wall
				x + newOffsetX >= _.getBoardColumns() ||
				y + newOffsetY >= _.getBoardRows()
			) {
				return false
			}
		}
	}

	return true
}
